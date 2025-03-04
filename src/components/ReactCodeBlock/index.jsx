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

const sandpackStyles = `
    .sandpack-responsive-layout {
      display: flex;
      flex-direction: row;
    }
    
    .sandpack-top-row {
      display: flex;
      height: 100%;
      width: 60%;
      max-width: 100%;
      flex-shrink: 0;
    }
    
    .sandpack-file-explorer {
      min-width: 25%;
    }
    
    .sandpack-code-editor {
      min-width: 75%;
    }
    
    .sandpack-preview {
      height: 100%;
      position: relative;
    }
    
    .sandpack-console-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(30, 30, 30, 0.9);
      z-index: 10;
      transition: height 0.3s ease;
      overflow: hidden;
    }
    
    .sandpack-console-collapsed {
      height: 32px;
    }
    
    .sandpack-console-expanded {
      height: 30%;
    }
    
    .sandpack-console-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 8px;
      background-color: #333;
      cursor: pointer;
      height: 32px;
      box-sizing: border-box;
    }
    
    .sandpack-console-title {
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    
    .sandpack-console-toggle {
      color: #fff;
      font-size: 12px;
    }
    
    .sandpack-console-content {
      height: calc(100% - 32px);
      overflow: auto;
    }

  @media (max-width: 768px) {
    .sandpack-responsive-layout {
      flex-direction: column;
    }
    
    .sandpack-top-row {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 50%;
    }
    
    .sandpack-file-explorer {
      max-width: 25%;
    }
    
    .sandpack-code-editor {
      min-width: 75%;
    }
    
    .sandpack-preview {
      height: 50%;
    }
    .sandpack-console-container {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    
    .sandpack-console-expanded {
      height: 40%;
    }
  }
`;

const markdown = `
<ReactCodeBlock shouldShowFileExplorer="true" shouldShowEditor="true" shouldShowPreview="true" shouldShowConsole="true" height="600px" width="100%" theme="dark" activeFile="App.js" readOnly="false" dependencies={{"react-router-dom": "6.20.1", "markdown-to-jsx": "^6.11.4"}} showReadOnly="false" showTabs="true" closableTabs="true" showLineNumbers="true" showInlineErrors="true" showRunButton="true" showNavigator="true" showOpenInCodeSandbox="false">
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
    <>
      <style>{sandpackStyles}</style>

      <Markdown
        options={{
          overrides: {
            ReactCodeBlock: ({ children, ...props }) => {
              const attributes = props;
              console.log(attributes);
              const files = {};
              const [consoleExpanded, setConsoleExpanded] =
                React.useState(false);

              const toggleConsole = () => {
                setConsoleExpanded(!consoleExpanded);
              };

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
                      className="sandpack-responsive-layout"
                      style={{
                        height: attributes.height || "100%",
                        width: attributes.width || "100%",
                      }}
                    >
                      <div className="sandpack-top-row">
                        {attributes.shouldShowFileExplorer !== false && (
                          <SandpackFileExplorer
                            className="sandpack-file-explorer"
                            style={{ height: "100%", width: "100%" }}
                            initialCollapsedFolder={["/src"]}
                          />
                        )}
                        {attributes.shouldShowEditor !== false && (
                          <SandpackCodeEditor
                            className="sandpack-code-editor"
                            style={{ height: "100%", width: "100%" }}
                            readOnly={attributes.readOnly}
                            showReadOnly={attributes.showReadOnly}
                            showTabs={attributes.showTabs}
                            closableTabs={attributes.closableTabs}
                            showLineNumbers={attributes.showLineNumbers}
                            showInlineErrors={attributes.showInlineErrors}
                            showRunButton={attributes.showRunButton}
                          />
                        )}
                      </div>

                      {attributes.shouldShowPreview !== false && (
                        <SandpackPreview
                          className="sandpack-preview"
                          style={{ height: "100%", width: "100%" }}
                          showNavigator={attributes.showNavigator}
                          showOpenInCodeSandbox={
                            attributes.showOpenInCodeSandbox
                          }
                        >
                          {attributes.shouldShowConsole !== false && (
                            <div
                              className={`sandpack-console-container ${
                                consoleExpanded
                                  ? "sandpack-console-expanded"
                                  : "sandpack-console-collapsed"
                              }`}
                            >
                              <div
                                className="sandpack-console-header"
                                onClick={toggleConsole}
                              >
                                <span className="sandpack-console-title">
                                  Console
                                </span>
                                <span className="sandpack-console-toggle">
                                  {consoleExpanded ? "▼" : "▲"}
                                </span>
                              </div>
                              <div className="sandpack-console-content">
                                <SandpackConsole
                                  className="sandpack-console"
                                  style={{ height: "100%", width: "100%" }}
                                />
                              </div>
                            </div>
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
    </>
  );
};

export default ReactCodeBlock;
