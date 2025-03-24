import styled from "styled-components";
import { SandpackConsole } from "@codesandbox/sandpack-react";

export const ConsoleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(30, 30, 30, 0.9);
  z-index: 10;
  transition: height 0.3s ease-in-out;
  overflow: hidden;
  height: ${(props) => (props.expanded ? "20%" : "32px")};

  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${(props) => (props.expanded ? "40%" : "32px")};
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