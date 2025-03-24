import React from "react";
import Markdown from "markdown-to-jsx";

import { SandpackProvider } from "@codesandbox/sandpack-react";

import SandpackConsole from "../SandpackConsole";

import {
  TopRow,
  StyledPreview,
  StyledCodeEditor,
  SandpackContainer,
  StyledFileExplorer,
  StyledSandpackLayout,
  StyledPreviewContainer,
} from "./StyledComponents";

import { markdown } from "../../fixtures/sampleMarkdown";


const ReactCodeBlock = () => {
  return (
    <Markdown
      options={{
        overrides: {
          ReactCodeBlock: ({ children, ...props }) => {
            const attributes = props;

            const files = React.useMemo(() => {
              const processedFiles = {};
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
                      processedFiles[`/${fileName}`] =
                        codeElement.props.children;
                    }
                  }
                }
              });
              return processedFiles;
            }, [children]);

            const hideFileExplorer =
              attributes.shouldShowFileExplorer === false;
            const hideEditor = attributes.shouldShowEditor === false;
            const hidePreview = attributes.shouldShowPreview === false;
            const hideConsole = attributes.shouldShowConsole === false;
            const hideTopRow = hideFileExplorer && hideEditor;
            const showPreviewFullWidth = hideFileExplorer && hideEditor;

            return (
              <SandpackContainer
                height={attributes.height}
                width={attributes.width}
              >
                <SandpackProvider
                  template="react"
                  theme={attributes.theme || "dark"}
                  options={{
                    activeFile: attributes.activeFile || "App.js",
                    recompileMode: "delayed",
                    recompileDelay: 1000,
                  }}
                  customSetup={{
                    dependencies: JSON.parse(attributes.dependencies),
                  }}
                  files={files}
                >
                  <StyledSandpackLayout
                    height={attributes.height}
                    width={attributes.width}
                  >
                    {(attributes.shouldShowFileExplorer !== false ||
                      attributes.shouldShowEditor !== false) && (
                      <TopRow
                        hidden={hideTopRow}
                        fullWidth={hidePreview}
                        hidePreview={hidePreview}
                      >
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
                      <StyledPreviewContainer
                        hidden={hidePreview}
                        fullwidth={showPreviewFullWidth}
                      >
                        <StyledPreview
                          hideconsole={hideConsole ? "true": "false"}
                          showNavigator={attributes.showNavigator}
                          showOpenInCodeSandbox={
                            attributes.showOpenInCodeSandbox
                          }
                        />
                        {attributes.shouldShowConsole !== false && (
                          <SandpackConsole hideConsole={hideConsole} />
                        )}
                      </StyledPreviewContainer>
                    )}
                  </StyledSandpackLayout>
                </SandpackProvider>
              </SandpackContainer>
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
