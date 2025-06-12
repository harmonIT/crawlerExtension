document.getElementById('startBtn').addEventListener('click', () => {
  const scrollDelay = parseInt(document.getElementById('scrollDelay').value);
  const maxPages = parseInt(document.getElementById('maxPages').value);
  const contentSelector = document.getElementById('contentSelector').value.trim();
  
  const statusEl = document.getElementById('status');
  statusEl.textContent = "正在抓取内容...";
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "startScraping",
      options: {
        scrollDelay,
        maxPages,
        contentSelector: contentSelector || null
      }
    }, (response) => {
      if (!response) {
        statusEl.textContent = "错误: 没有收到响应";
        return;
      }
      
      if (response.status === "success") {
        statusEl.textContent = "内容抓取完成，正在下载...";
        
        // 使用 chrome.downloads API 请求用户指定文件的保存位置
        chrome.downloads.download({
          url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.content),
          filename: `scraped_content_${new Date().toISOString().slice(0,10)}.txt`,
          saveAs: true // 请求用户指定保存路径
        }, (downloadId) => {
          if (chrome.runtime.lastError) {
            statusEl.textContent = "错误: " + chrome.runtime.lastError.message;
          } else {
            setTimeout(() => {
              statusEl.textContent = "完成!";
            }, 2000);
          }
        });
      } else {
        statusEl.textContent = "错误: " + (response.error || "未知错误");
      }
    });
  });
});
