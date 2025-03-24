import React, { Suspense, lazy } from "react";
const ReactCodeBlock = lazy(() => import("./components/ReactCodeBlock"));

const App = () => (
  <Suspense fallback={<div>Loading React IDE ...</div>}>
    <ReactCodeBlock />
  </Suspense>
);

// import ReactCodeBlock from "./components/ReactCodeBlock";
// const App = () => <ReactCodeBlock />;

export default App;
