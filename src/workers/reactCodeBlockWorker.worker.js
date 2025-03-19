self.onmessage = async (event) => {
  const { markdown } = event.data;
  
  try {
    const processedFiles = {};
    
    const fileRegex = /<file name="([^"]+)">([\s\S]*?)<\/file>/g;
    let match;
    
    while ((match = fileRegex.exec(markdown)) !== null) {
      const fileName = match[1];
      const content = match[2];
      
      const codeRegex = /```([^\n]*)\n([\s\S]*?)```/g;
      let codeMatch;
      
      if ((codeMatch = codeRegex.exec(content)) !== null) {
        processedFiles[`/${fileName}`] = codeMatch[2];
      }
    }

    self.postMessage({
      status: 'success',
      processedFiles
    });
  } catch (error) {
    console.error("Worker processing error:", error);
    self.postMessage({
      status: 'error',
      error: error.message || "Unknown error in worker"
    });
  }
};