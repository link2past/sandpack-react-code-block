self.onmessage = async (event) => {
  const { markdown, origin } = event.data;

  console.log("[Worker] Received markdown:", markdown);
  console.log("[Worker] Origin:", origin);

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
            // Store parent origin for secure communication
            window.parentOrigin = "${origin || '*'}";
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
            try {
              const props = Object.assign({}, ${JSON.stringify(attributes)}, ${JSON.stringify(processedFiles)});
              console.log("[Iframe] App type:", typeof App);
              console.log("[Iframe] Props:", props);

              const Component = typeof App === "function" ? App : (App?.default ?? null);
              
              if (typeof Component !== "function") {
                throw new Error("App is not a valid React component: " + JSON.stringify(Component));
              }

              ReactDOM.render(
                React.createElement(Component, props),
                document.getElementById("root")
              );

              console.log("[Iframe] App rendered.");
              
              // Safely communicate with parent window
              if (window.parent && window.parentOrigin) {
                window.parent.postMessage({ type: "SANDBOX_READY" }, window.parentOrigin);
              }
            } catch (e) {
              console.error("[Iframe] Render error:", e);
              const pre = document.createElement("pre");
              pre.textContent = "Render Error: " + e.message;
              document.body.appendChild(pre);
              
              // Report error to parent
              if (window.parent && window.parentOrigin) {
                window.parent.postMessage({ 
                  type: "SANDBOX_ERROR", 
                  error: e.message 
                }, window.parentOrigin);
              }
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
