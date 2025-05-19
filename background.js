// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "download") {
      const blob = new Blob([request.data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      
      chrome.downloads.download({
        url: url,
        filename: request.filename || "webpage_content.txt",
        saveAs: true
      }, () => {
        URL.revokeObjectURL(url);
      });
    }
  });