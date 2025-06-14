document.getElementById('startBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("没有找到活动标签页");
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { action: "startScraping" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("发送消息时出错:", chrome.runtime.lastError);
        return;
      }

      if (!response) {
        console.error("没有收到响应");
        return;
      }

      if (response.status === "scrapSuccess") {
        alert("爬取成功,点击下载按钮");

      }
    });
  });
});

document.getElementById('download').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("没有找到活动标签页");
      return;
    }
  chrome.tabs.sendMessage(tabs[0].id,{action:"download"},(response)=>{
    if (response.status === "downloadSuccess"){
      console.log('下载成功')
    }
    if (chrome.runtime.lastError) {
      console.error("发送消息时出错:", chrome.runtime.lastError);
      return;
  }

  if (!response) {
      console.error("没有收到响应");
      return;
  }
})
})
})