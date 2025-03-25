import styled from "styled-components";
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

export const SandpackContainer = styled.div`
  height: ${(props) => props.height || "350px"};
  width: ${(props) => props.width || "90vw"};
`;

export const StyledSandpackLayout = styled(SandpackLayout)`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const TopRow = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  height: 100%;
  width: ${(props) => (props.fullWidth ? "100%" : "60%")};

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: ${(props) => (props.hidePreview ? "100%" : "50%")};
  }
`;

export const StyledFileExplorer = styled(SandpackFileExplorer)`
  min-width: 25%;
  height: 100%;
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;

export const StyledCodeEditor = styled(SandpackCodeEditor)`
  min-width: 75%;
  height: 100%;
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;

export const StyledPreviewContainer = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  width: ${(props) => (props.fullwidth ? "100%" : "40%")};
  position: relative;
  flex: 1;

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;

export const StyledPreview = styled(SandpackPreview)`
  width: 100%;
  height: ${(props) => (props.hideconsole ? "100%" : "calc(100%-32px)")};
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
