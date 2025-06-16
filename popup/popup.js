//中控函数
//此时的DOM是popup.html的DOM，和页面的DOM没有关系，寻找页面的元素找不到
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
chrome.runtime.onMessage.addListener((request,sender,response)=>{
  document.getElementById('download').addEventListener('click',()=>{
    if (request.action === "toPopupDownload"){
      chrome.runtime.sendMessage({action: "toBackgroundDownload", content: request.content})
    }
    if (response.status === "downloadSuccess") {
      console.log('下载成功')
    }
    if (!response) {
      console.error("没有收到响应");
      return;
    }
  });
})
