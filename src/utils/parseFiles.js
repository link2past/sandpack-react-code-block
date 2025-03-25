import React from "react";
export const extractFilesFromChildren = (children) => {
    const processedFiles = {};
    React.Children.forEach(children, (child) => {
      if (typeof child === "string") return;
      if (child?.type === "file" && child?.props?.name) {
        const fileName = child.props.name;
        const preElement = React.Children.toArray(child.props.children).find(
          (c) => c?.type === "pre"
        );
        if (preElement) {
          const codeElement = React.Children.toArray(preElement.props.children).find(
            (c) => c?.type === "code"
          );
          if (codeElement) {
            processedFiles[`/${fileName}`] = codeElement.props.children;
          }
        }
      }
    });
    return processedFiles;
  };
  