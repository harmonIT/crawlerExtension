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

      if (response.status === "success") {
        alert("已成功获取,点击下载按钮");
        document.getElementById('download').addEventListener('click', () => {
          // 创建一个Blob对象
          const blob = new Blob([response.content], { type: 'text/plain' });

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
        });
      } else if (response.status === "error") {
        console.error("错误:", response.error);
      } else {
        console.error("未知的响应状态:", response);
      }
    });
  });
});
