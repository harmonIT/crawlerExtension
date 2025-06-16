// 收集当前页面的内容并传递下载内容到background.js
let contentToDownload = [];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    // 获取所有类名为 'short' 的元素
    let elements = document.getElementsByClassName('short');

    // 遍历每个元素
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var textContent = element.textContent.trim();
      
      // 检查文本内容是否为空
      if (textContent) {
        contentToDownload.push(textContent);
      }
    }

    // 发送抓取的内容到后台脚本
    sendResponse({
      status: "scrapSuccess",
      content: contentToDownload.join('\n')
    });
    chrome.runtime.sendMessage({action: "toPopupDownload", content: contentToDownload})
  }
});

