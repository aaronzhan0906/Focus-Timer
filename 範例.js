// 定義兩個變數來儲存按鈕元素
const startButton = document.getElementById("start-button");
const stopFocusButton = document.getElementById("stop-focus");

// 添加 click 事件監聽器到 startButton 元素
startButton.addEventListener("click", () => {
  // 隱藏輸入框和 start 按鈕
  document.getElementById("input").style.display = "none";
  startButton.style.display = "none";

  // 顯示 stop 按鈕
  stopFocusButton.style.display = "block";

  // 啟動計時器
  const startTime = Date.now();

  // 定義一個函式來更新計時器
  const updateTimer = () => {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 1000 / 60);
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `${minutes} 分鐘 ${seconds} 秒`;
  };

  // 每隔 1 秒更新計時器
  setInterval(updateTimer, 1000);
});

// 添加 click 事件監聽器到 stopFocusButton 元素
stopFocusButton.addEventListener("click", () => {
  // 顯示輸入框和 start 按鈕
  document.getElementById("input").style.display = "block";
  startButton.style.display = "block";

  // 隱藏 stop 按鈕
  stopFocusButton.style.display = "none";

  // 停止計時器
  clearInterval(updateTimer);

  // 顯示專注時間統計資訊
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 1000 / 60);
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  alert(`您本次專注了 ${minutes} 分鐘 ${seconds} 秒。`);
});
