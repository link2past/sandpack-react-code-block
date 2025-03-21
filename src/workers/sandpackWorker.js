self.onmessage = async (event) => {
  const { markdown } = event.data;

  console.log("[Worker] Received markdown:", markdown);

  try {
    const processedFiles = {};
    const fileRegex = /<file name="([^"]+)">([\s\S]*?)<\/file>/g;
    let match;

    while ((match = fileRegex.exec(markdown)) !== null) {
      const fileName = match[1];
      const content = match[2];

      const codeRegex = /```([^\n]*)\n([\s\S]*?)```/g;
      let codeMatch;

      if ((codeMatch = codeRegex.exec(content)) !== null) {
        processedFiles[`/${fileName}`] = codeMatch[2];
      }
    }

    console.log("[Worker] Parsed files:", processedFiles);

    // Extract attributes from <ReactCodeBlock>
    const propsRegex = /<ReactCodeBlock\s([^>]*)>/;
    const propsMatch = markdown.match(propsRegex);
    const attributes = {};

    if (propsMatch) {
      const propsString = propsMatch[1];
      const propsArray = propsString.match(/(\w+)=(?:"([^"]+)"|{([^}]+)})/g);

      if (propsArray) {
        propsArray.forEach((prop) => {
          const [key, value1, value2] = prop
            .match(/(\w+)=(?:"([^"]+)"|{([^}]+)})/)
            .slice(1);
          attributes[key] = value1 || value2;
        });

        if (attributes.dependencies) {
          try {
            const depRaw = attributes.dependencies
              .replace(/^{/, "")
              .replace(/}$/, "")
              .split(",")
              .map((pair) =>
                pair
                  .trim()
                  .split(":")
                  .map((s) =>
                    s.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "")
                  )
              );

            attributes.dependencies = Object.fromEntries(depRaw);
          } catch (error) {
            console.error("[Worker] Failed to parse dependencies:", error);
          }
        }
      }
    }

    Object.keys(attributes).forEach((key) => {
      if (attributes[key] === "true") attributes[key] = true;
      if (attributes[key] === "false") attributes[key] = false;
    });

    console.log("[Worker] Parsed attributes:", attributes);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Sandpack Worker Output</title>
          <script>
            console.log("[Iframe] Loading dependencies...");
          </script>
          <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
          <script>
            console.log("[Iframe] React + ReactDOM loaded.");
          </script>
          <script src="/sandpackBundle.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            console.log("[Iframe] Rendering App with props:", ${JSON.stringify(attributes)});
            console.log("[Iframe] Rendering App with files:", ${JSON.stringify(processedFiles)});

            try {
              ReactDOM.render(
                React.createElement(App, ${JSON.stringify(attributes)}, ${JSON.stringify(processedFiles)}),
                document.getElementById('root')
              );
              console.log("[Iframe] App rendered.");
            } catch (e) {
              console.error("[Iframe] Render error:", e);
              const errorEl = document.createElement("pre");
              errorEl.textContent = "Render Error: " + e.message;
              document.body.appendChild(errorEl);
            }
          </script>
        </body>
      </html>
    `;

    self.postMessage({
      status: "success",
      html: htmlContent,
      processedFiles,
      attributes,
    });
  } catch (error) {
    console.error("[Worker] Uncaught error:", error);

    self.postMessage({
      status: "error",
      error: error.message || "Unknown error in worker",
    });
  }
};
