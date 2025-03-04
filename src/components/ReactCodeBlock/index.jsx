import React from "react";
import Markdown from "markdown-to-jsx";

import { SandpackProvider } from "@codesandbox/sandpack-react";

import {
  ResponsiveLayout,
  TopRow,
  StyledFileExplorer,
  StyledCodeEditor,
  StyledPreview,
  ConsoleContainer,
  ConsoleHeader,
  ConsoleTitle,
  ConsoleToggle,
  ConsoleContent,
  StyledConsole,
  ContainerDiv,
} from "./StyledComponents";

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

              // Calculate visibility conditions
              const hideFileExplorer =
                attributes.shouldShowFileExplorer === false;
              const hideEditor = attributes.shouldShowEditor === false;
              const hidePreview = attributes.shouldShowPreview === false;
              const hideConsole = attributes.shouldShowConsole === false;
              const hideTopRow = hideFileExplorer && hideEditor;
              const showPreviewFullWidth = hideFileExplorer && hideEditor;

              return (
                <ContainerDiv
                  height={attributes.height}
                  width={attributes.width}
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
                    <ResponsiveLayout
                      height={attributes.height}
                      width={attributes.width}
                    >
                      {(attributes.shouldShowFileExplorer !== false ||
                        attributes.shouldShowEditor !== false) && (
                        <TopRow hidden={hideTopRow} fullWidth={hidePreview}>
                          {attributes.shouldShowFileExplorer !== false && (
                            <StyledFileExplorer
                              hidden={hideFileExplorer}
                              initialCollapsedFolder={["/src"]}
                            />
                          )}
                          {attributes.shouldShowEditor !== false && (
                            <StyledCodeEditor
                              hidden={hideEditor}
                              readOnly={attributes.readOnly}
                              showReadOnly={attributes.showReadOnly}
                              showTabs={attributes.showTabs}
                              closableTabs={attributes.closableTabs}
                              showLineNumbers={attributes.showLineNumbers}
                              showInlineErrors={attributes.showInlineErrors}
                              showRunButton={attributes.showRunButton}
                            />
                          )}
                        </TopRow>
                      )}

                      {attributes.shouldShowPreview !== false && (
                        <StyledPreview
                          hidden={hidePreview}
                          fullWidth={showPreviewFullWidth}
                          showNavigator={attributes.showNavigator}
                          showOpenInCodeSandbox={
                            attributes.showOpenInCodeSandbox
                          }
                        >
                          {attributes.shouldShowConsole !== false && (
                            <ConsoleContainer expanded={consoleExpanded}>
                              <ConsoleHeader onClick={toggleConsole}>
                                <ConsoleTitle>Console</ConsoleTitle>
                                <ConsoleToggle>
                                  {consoleExpanded ? "▼" : "▲"}
                                </ConsoleToggle>
                              </ConsoleHeader>
                              <ConsoleContent>
                                <StyledConsole />
                              </ConsoleContent>
                            </ConsoleContainer>
                          )}
                        </StyledPreview>
                      )}
                    </ResponsiveLayout>
                  </SandpackProvider>
                </ContainerDiv>
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
