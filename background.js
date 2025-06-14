chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  if (request.action === "download"){
  
      // 创建一个Blob对象
      const blob = new Blob([content], { type: 'text/plain' });

      // 创建一个下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'scraped_content.txt'; // 设置下载文件的名称
      document.body.appendChild(a);
      a.click();

      // 清理
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  }
  sendResponse({
    status: "downloadSuccess",
  })
})