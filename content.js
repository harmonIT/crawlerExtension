// 收集当前页面的内容并传递下载内容到background.js
let contentToDownload = [];
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    regulation()

    sendResponse({
      status: "scrapSuccess",
      content: contentToDownload.join('\n')
    });
    // chrome.runtime.sendMessage({action: "toPopupDownload", content: contentToDownload})
    console.log(contentToDownload)
  }
  
  if (request.action==="toContentTurn"){
    let ele=document.querySelector(".fui-next")
    ele.click()
    console.log("点击翻页")
    
  }
});

function regulation(){
      let elements = document.querySelectorAll('.title-text');
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var textContent = element.textContent.trim();
        
        // 检查文本内容是否为空
        if (textContent) {
          contentToDownload.push(textContent);
        }
      }
}

