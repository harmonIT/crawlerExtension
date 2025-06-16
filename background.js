//处理下载逻辑
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toBackgroundDownload") {
    const blob = new Blob([request.content], { type: 'text/plain' });
    // 使用 FileReader 将 Blob 转换为 Data URL
    const reader = new FileReader();
    reader.onload = function(event) {
      const dataUrl = event.target.result;
      
      // 使用 chrome.downloads.download 下载文件
      chrome.downloads.download({
        url: dataUrl,
        filename: 'scraped_content.txt',
        saveAs: false
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            status: "downloadFailed",
            error: chrome.runtime.lastError.message
          });
        } else {
          sendResponse({
            status: "downloadSuccess",
            downloadId: downloadId
          });
        }
      });
    };
    reader.readAsDataURL(blob);
  }
});

