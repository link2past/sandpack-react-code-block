import React from "react";

import {
  ConsoleTitle,
  ConsoleHeader,
  ConsoleToggle,
  StyledConsole,
  ConsoleContent,
  ConsoleContainer,
} from "./StyledComponents";

const SandpackConsole = React.memo(({ hideConsole }) => {
  const [consoleExpanded, setConsoleExpanded] = React.useState(false);

  const toggleConsole = React.useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setConsoleExpanded((prev) => !prev);
  }, []);

  return (
    <>
      {!hideConsole && (
        <ConsoleContainer expanded={consoleExpanded}>
          <ConsoleHeader onClick={toggleConsole}>
            <ConsoleTitle>Console</ConsoleTitle>
            <ConsoleToggle>{consoleExpanded ? "▼" : "▲"}</ConsoleToggle>
          </ConsoleHeader>
          <ConsoleContent>
            <StyledConsole />
          </ConsoleContent>
        </ConsoleContainer>
      )}
    </>
  );
});

export default SandpackConsole;
