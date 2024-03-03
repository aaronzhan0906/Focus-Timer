//以下是初始設定
let minutes = 0;
let seconds = 0;
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const table = document.getElementById("table-done-list");
const inputText = document.getElementById("input-focus-item");

let interval; //store variable of timer

//以下是localstorage

let tableState = [];

//以下是計時器
// timer display
const timer = () => {
  seconds++;

  // 少於 10 的秒數前面加 0 以保持兩位數格式
  if (seconds <= 9) {
    displaySeconds.innerHTML = `0${seconds}`;
  } else {
    displaySeconds.innerHTML = seconds;
  }

  // 如果秒數大於 59，增加分鐘數並重置秒數
  if (seconds > 59) {
    minutes++;
    seconds = 0;

    // 分鐘數小於 10 的前面加 0 以保持兩位數格式
    if (minutes <= 9) {
      displayMinutes.innerHTML = `0${minutes}`;
    } else {
      displayMinutes.innerHTML = minutes;
    }
  }
};
//以上是計時器

//以下是 Focus Start 和 Focus Stop 的功能
//輸入專注項目，並按下 Focus Start 時，將專注項目加入tableState
buttonStart.addEventListener("click", startFocusTimer);
function startFocusTimer() {
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    clearInterval(interval); // 清除現有計時器，避免計時器運作
    alert("請輸入專注項目");
    return; // 終止函式
  } else {
    input.value = "";
  }
  // 開始計時器
  clearInterval(interval);
  interval = setInterval(timer, 1000);

  //將專注項目加入tableState
  tableState.unshift(text);

  //隱藏輸入框、隱藏 Focus Start、顯示 Focus Stop 按鈕
  buttonStart.style.display = "none"; // 隱藏 Start 按鈕
  buttonStop.style.display = "inline-block"; // 顯示 Focus Stop 按鈕
  inputText.style.display = "none"; // 隱藏 input-focus-item
}

//按下 Focus Stop 時，將專注項目、時間、刪除按鈕加入 Done List
buttonStop.addEventListener("click", stopFocusTimer);
function stopFocusTimer() {
  clearInterval(interval); // 清除現有計時器，避免計時器運作

  // 取得停止計時器時的時間
  const stoppedMinutes = minutes;
  const stoppedSeconds = seconds;

  // 重置時間顯示
  seconds = 0;
  minutes = 0;
  displaySeconds.innerHTML = `00`;
  displayMinutes.innerHTML = `00`;

  //移除 id initial-scale 的 tr 範例
  const initialSpan = document.getElementById("initial-span");
  if (initialSpan) {
    initialSpan.remove();
  }

  // 取得專注項目
  const text = tableState.pop();

  // 創建新的時間顯示
  const newTime = document.createElement("span");
  newTime.innerHTML = `${
    stoppedMinutes < 10 ? "0" + stoppedMinutes : stoppedMinutes
  }:${stoppedSeconds < 10 ? "0" + stoppedSeconds : stoppedSeconds}`;

  // 創建刪除鍵
  const newButton = document.createElement("button");
  newButton.classList.add("deletebutton");
  newButton.innerHTML = "刪除";

  // 創建新的 table row 並將項目、時間和按鈕添加到其中
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${text}</td><td>${newTime.innerHTML}</td><td>${newButton.outerHTML}</td>`;

  // 將新的 table row 添加到 table 中
  table.appendChild(tr);

  // 顯示 Focus Start 按鈕、隱藏 Focus Stop 按鈕、顯示 input-focus-item
  buttonStop.style.display = "none"; // 隱藏 Focus Stop 按鈕
  buttonStart.style.display = "inline-block"; // 顯示 Start 按鈕
  inputText.style.display = "block"; // 顯示 input-focus-item
}

// Done List 的刪除按鈕效果
table.addEventListener("click", function (event) {
  console.log("deletetest");
  if (event.target.classList.contains("deletebutton")) {
    const row = event.target.closest("tr");
    row.remove();
  }
});

//預防刷新頁面（最後再來檢查需不需要這一段）
// const form = document.getElementById("input-wrapper");
// form.addEventListener("submit", (event) => {
//   evenpreventDefault();
// });
