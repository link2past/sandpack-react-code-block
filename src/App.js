import React from "react";
import WorkerSandpackWrapper from "./WorkerSandpackWrapper";

const markdownInput = `
<ReactCodeBlock shouldShowFileExplorer="true" shouldShowEditor="true" shouldShowPreview="true" shouldShowConsole="true" height="600px" width="100%" theme="dark" activeFile="App.js" readOnly="false" dependencies={{"react-router-dom": "6.20.1", "markdown-to-jsx": "^6.11.4","js-cookie":"3.0.5"}} showReadOnly="false" showTabs="true" closableTabs="true" showLineNumbers="true" showInlineErrors="true" showRunButton="true" showNavigator="true" showOpenInCodeSandbox="false">
  <file name="App.js">
  \`\`\`jsx
  import React from "react";
  export default function App() { return <h1>Hello from Web Worker!</h1>; }
  \`\`\`
  </file>
   <file name="wrapper.js">
  \`\`\`jsx
  import React from "react";
  export default function App() { return <h1>Hello from Web Worker!</h1>; }
  \`\`\`
  </file>
   <file name=".env.js">
  \`\`\`jsx
  import React from "react";
  export default function App() { return <h1>Hello from Web Worker!</h1>; }
  \`\`\`
  </file>
</ReactCodeBlock>
`;

const App = () => <WorkerSandpackWrapper markdownInput={markdownInput} />;

export default App;
