import React, { useEffect, useState, useRef } from "react";

const WorkerSandpackWrapper = ({ markdownInput }) => {
  const iframeRef = useRef(null);
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    const worker = new Worker(new URL("./workers/sandpackWorker.js", import.meta.url));

    console.log("[Main] Posting markdown to worker...");
    worker.postMessage({ markdown: markdownInput, origin: window.location.origin });

    worker.onmessage = (event) => {
      if (event.data.status === "success") {
        console.log("[Main] Received HTML content from worker.");
        setIframeContent(event.data.html);
      } else {
        console.error("[Main] Worker Error:", event.data.error);
      }
    };

    worker.onerror = (err) => {
      console.error("[Main] Worker runtime error:", err);
    };

    return () => {
      console.log("[Main] Terminating worker.");
      worker.terminate();
    };
  }, [markdownInput]);


  return (
    <iframe
      ref={iframeRef}
      srcDoc={iframeContent}
      style={{ width: "100%", height: "600px", border: "none" }}
      title="Sandpack Output"
    />
  );
};


export default WorkerSandpackWrapper;
