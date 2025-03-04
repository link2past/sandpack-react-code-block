import React from "react";
import Markdown from "markdown-to-jsx";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";

const markdown = `
<ReactCodeBlock showConsole="true" showEditor="true" showPreview="true" showFileExplorer="true" height="95vh" width="100%" theme="dark" activeFile="App.js" readOnly="false" dependencies={{"react-router-dom": "6.20.1", "markdown-to-jsx": "^6.11.4"}} showReadOnly="false" showTabs="true" closableTabs="true" showLineNumbers="true" showInlineErrors="true" showRunButton="true" showNavigator="true" showOpenInCodeSandbox="false">
<file name="App.js">
\`\`\`jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

export default function App() {
  const [data, setData] = useState(null);
  const [cookieValue, setCookieValue] = useState("");

  // Test Network Requests
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        console.log("Fetched Data:", json);
        setData(json.title);
      })
      .catch((error) => console.error("Fetch Error:", error));
  }, []);

  // Test Cookies Storage
  const setCookie = () => {
    document.cookie = "testCookie=HelloSandpack; path=/";
    console.log("Cookie Set: testCookie=HelloSandpack");
    checkCookies();
  };

  const checkCookies = () => {
    const allCookies = document.cookie;
    console.log("Current Cookies:", allCookies);
    setCookieValue(allCookies);
  };

  return (
    <div>
      <h2>Sandpack Testing</h2>

      <h3>Network Request</h3>
      <p>Fetched Data: {data || "Loading..."}</p>

      <h3>Cookies</h3>
      <button onClick={setCookie}>Set Cookie</button>
      <p>Stored Cookies: {cookieValue}</p>

      <h3>Console Logging</h3>
      <button onClick={() => console.log("Console Test Log")}>
        Log to Console
      </button>
          <Router>
      <div style={{ padding: "1rem" }}>
        <h1>🚀 React Router in Sandpack</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}
\`\`\`
</file>

<file name="index.js">
\`\`\`jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
\`\`\`
</file>

<file name="wrapper.js">
\`\`\`jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

export default function App() {
  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <h1>🚀 React Router in Sandpack</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/contact">Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
\`\`\`
</file>

</ReactCodeBlock>
`;

const ReactCodeBlock = () => {
  return (
    <Markdown
      options={{
        overrides: {
          ReactCodeBlock: ({ children, ...props }) => {
            const attributes = props;
            console.log(attributes);
            const files = {};

            React.Children.forEach(children, (child) => {
              if (typeof child === "string") return;

              if (child?.type === "file" && child?.props?.name) {
                const fileName = child.props.name;

                const preElement = React.Children.toArray(
                  child.props.children
                ).find((c) => c?.type === "pre");

                if (preElement) {
                  const codeElement = React.Children.toArray(
                    preElement.props.children
                  ).find((c) => c?.type === "code");

                  if (codeElement) {
                    files[`/${fileName}`] = codeElement.props.children;
                  }
                }
              }
            });

            return (
              <div
                style={{
                  height: attributes.height || "350px",
                  width: attributes.width || "90vw",
                }}
              >
                <SandpackProvider
                  template="react"
                  theme={attributes.theme || "dark"}
                  options={{
                    activeFile: attributes.activeFile || "App.js",
                  }}
                  customSetup={{
                    dependencies: JSON.parse(attributes.dependencies),
                  }}
                  files={files}
                >
                  <SandpackLayout
                    style={{
                      height: attributes.height || "350px",
                      width: attributes.width || "90vw",
                    }}
                  >
                    {attributes.showFileExplorer && (
                      <SandpackFileExplorer
                        style={{ height: "100%", width: "100%" }}
                        initialCollapsedFolder={["/src"]}
                      />
                    )}
                    {attributes.showEditor && (
                      <SandpackCodeEditor
                        style={{ height: "100%", width: "100%" }}
                        readOnly={attributes.readOnly}
                        showReadOnly={attributes.showReadOnly}
                        showTabs={attributes.showTabs}
                        closableTabs={attributes.closableTabs}
                        showLineNumbers={attributes.showLineNumbers}
                        showInlineErrors={
                          attributes.showInlineErrors
                        }
                        showRunButton={attributes.showRunButton}
                      />
                    )}
                    {attributes.showPreview && (
                      <SandpackPreview
                        style={{ height: "100%", width: "100%" }}
                        showNavigator={attributes.showNavigator}
                        showOpenInCodeSandbox={
                          attributes.showOpenInCodeSandbox
                        }
                      >
                        {attributes.showConsole && (
                          <SandpackConsole
                            style={{ height: "30%", width: "100%" }}
                          />
                        )}
                      </SandpackPreview>
                    )}
                  </SandpackLayout>
                </SandpackProvider>
              </div>
            );
          },
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default ReactCodeBlock;
