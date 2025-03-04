import styled from "styled-components";
import {
    SandpackLayout,
    SandpackCodeEditor,
    SandpackFileExplorer,
    SandpackPreview,
    SandpackConsole,
  } from "@codesandbox/sandpack-react";

export const ResponsiveLayout = styled(SandpackLayout)`
  display: flex;
  flex-direction: row;
  height: ${props => props.height || "100%"};
  width: ${props => props.width || "100%"};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TopRow = styled.div`
  display: ${props => (props.hidden ? "none" : "flex")};
  height: 100%;
  width: ${props => (props.fullWidth ? "100%" : "60%")};
  max-width: 100%;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    height: 50%;
  }
`;

export const StyledFileExplorer = styled(SandpackFileExplorer)`
  min-width: 25%;
  height: 100%;
  width: 100%;
  display: ${props => (props.hidden ? "none" : "flex")};
  
  @media (max-width: 768px) {
    max-width: 25%;
  }
`;

export const StyledCodeEditor = styled(SandpackCodeEditor)`
  min-width: 75%;
  height: 100%;
  width: 100%;
  display: ${props => (props.hidden ? "none" : "flex")};
  
  @media (max-width: 768px) {
    min-width: 75%;
  }
`;

export const StyledPreview = styled(SandpackPreview)`
  height: 100%;
  width: ${props => (props.fullWidth ? "100%" : "40%")};
  position: relative;
  display: ${props => (props.hidden ? "none" : "flex")};
  
  @media (max-width: 768px) {
    height: 50%;
  }
`;

export const ConsoleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(30, 30, 30, 0.9);
  z-index: 10;
  transition: height 0.3s ease;
  overflow: hidden;
  height: ${props => (props.expanded ? "20%" : "32px")};
  
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${props => (props.expanded ? "40%" : "32px")};
  }
`;

export const ConsoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background-color: #333;
  cursor: pointer;
  height: 32px;
  box-sizing: border-box;
`;

export const ConsoleTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const ConsoleToggle = styled.span`
  color: #fff;
  font-size: 12px;
`;

export const ConsoleContent = styled.div`
  height: calc(100% - 32px);
  overflow: auto;
`;

export const StyledConsole = styled(SandpackConsole)`
  height: 100%;
  width: 100%;
`;

export const ContainerDiv = styled.div`
  height: ${props => props.height || "350px"};
  width: ${props => props.width || "90vw"};
`;