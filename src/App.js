import React, { Suspense, lazy } from "react";

// import ReactCodeBlock from "./components/ReactCodeBlock";
// const App = () => <ReactCodeBlock />;

const ReactCodeBlock = lazy(() => import("./components/ReactCodeBlock"));
const App = () => (
  <Suspense fallback={<p>Loading React IDE ...</p>}>
    <ReactCodeBlock />
  </Suspense>
);

export default App;
