import React from "react";
import Markdown from "markdown-to-jsx";
import SandpackRenderer from "../SandpackRenderer";
import { markdown } from "../../fixtures/sampleMarkdown";

const ReactCodeBlock = () => {
  return (
    <Markdown
      options={{
        overrides: {
          ReactCodeBlock: SandpackRenderer,
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default ReactCodeBlock;
