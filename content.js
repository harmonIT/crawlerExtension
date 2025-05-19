// 自动滚动和收集内容的函数
function autoScrollAndCollect(options) {
    return new Promise((resolve) => {
      const { scrollDelay, maxPages, contentSelector } = options;
      let collectedContent = [];
      let pagesScrolled = 0;
      
      // 收集当前页面的内容
      function collectContent() {
        let contentElements;
        
        if (contentSelector) {
          contentElements = document.querySelectorAll(contentSelector);
        } else {
          // 默认收集所有段落和文章类内容
          contentElements = document.querySelectorAll('p, article, .content, .article, .post');
        }
        
        contentElements.forEach(el => {
          const text = el.textContent.trim();
          if (text) collectedContent.push(text);
        });
      }
      
      // 滚动函数
      function scrollPage() {
        collectContent();
        
        if (pagesScrolled >= maxPages) {
          resolve(collectedContent.join('\n\n'));
          return;
        }
        
        // 滚动到页面底部
        window.scrollBy(0, window.innerHeight);
        pagesScrolled++;
        
        // 设置下一次滚动
        setTimeout(scrollPage, scrollDelay);
      }
      
      // 开始滚动
      scrollPage();
    });
  }
  
  // 监听来自弹出窗口的消息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startScraping") {
      autoScrollAndCollect(request.options).then(content => {
        sendResponse({
          status: "success",
          content: content
        });
      }).catch(error => {
        sendResponse({
          status: "error",
          error: error.message
        });
      });
      
      return true; // 保持消息通道开放
    }
  });