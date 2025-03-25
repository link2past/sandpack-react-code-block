import React from "react";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import {
  SandpackContainer,
  StyledSandpackLayout,
  TopRow,
  StyledFileExplorer,
  StyledCodeEditor,
  StyledPreviewContainer,
  StyledPreview,
} from "./StyledComponents";

import SandpackConsole from "../SandpackConsole";
import { extractFilesFromChildren } from "../../utils/parseFiles";

const SandpackRenderer = ({ children, ...attributes }) => {
  const files = React.useMemo(
    () => extractFilesFromChildren(children),
    [children]
  );

  const {
    height,
    width,
    theme = "dark",
    activeFile = "App.js",
    dependencies = "{}",
    shouldShowFileExplorer = true,
    shouldShowEditor = true,
    shouldShowPreview = true,
    shouldShowConsole = true,
  } = attributes;

  const hideTopRow = !shouldShowFileExplorer && !shouldShowEditor;
  const showPreviewFullWidth = !shouldShowFileExplorer && !shouldShowEditor;

  return (
    <SandpackContainer height={height} width={width}>
      <SandpackProvider
        template="react"
        theme={theme}
        options={{
          activeFile,
          recompileMode: "delayed",
          recompileDelay: 1000,
        }}
        customSetup={{
          dependencies: JSON.parse(dependencies),
        }}
        files={files}
      >
        <StyledSandpackLayout height={height} width={width}>
          {!hideTopRow && (
            <TopRow
              hidden={hideTopRow}
              fullWidth={!shouldShowPreview}
              hidePreview={!shouldShowPreview}
            >
              {shouldShowFileExplorer && (
                <StyledFileExplorer
                  hidden={!shouldShowFileExplorer}
                  initialCollapsedFolder={["/src"]}
                />
              )}
              {shouldShowEditor && (
                <StyledCodeEditor
                  hidden={!shouldShowEditor}
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

          {shouldShowPreview && (
            <StyledPreviewContainer
              hidden={!shouldShowPreview}
              fullwidth={showPreviewFullWidth}
            >
              <StyledPreview
                hideconsole={shouldShowConsole ? "false" : "true"}
                showNavigator={attributes.showNavigator}
                showOpenInCodeSandbox={attributes.showOpenInCodeSandbox}
              />
              {shouldShowConsole && (
                <SandpackConsole hideConsole={!shouldShowConsole} />
              )}
            </StyledPreviewContainer>
          )}
        </StyledSandpackLayout>
      </SandpackProvider>
    </SandpackContainer>
  );
};

export default SandpackRenderer;
