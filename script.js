// 以下是初始設定
let minutes = 0;
let seconds = 0;
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const buttonStart = document.getElementById("button-start");
const buttonStop = document.getElementById("button-stop");
const table = document.getElementById("table-done-list");
const inputText = document.getElementById("input-focus-item");
const example = document.getElementById("example");

let interval; //store variable of timer

let itemState = []; //store the focus item

// 如果 tableState 沒有項目，則加入示意 table row
function removeInitialSpan() {
  if (tableState.length === 0) {
    example.innerHTML = `
      <tr>
        <td>示意</td>
        <td>25:00</td>
        <td><button type="button" class="deletebutton">刪除</button></td>
      </tr>
    `;
  }
}

// 以下是 localstorage
let tableState = [];

const STATE_KEY = "tableState";

// Load the state from local storage
function loadState() {
  const savedState = localStorage.getItem(STATE_KEY);
  if (savedState) {
    return JSON.parse(savedState);
  } else {
    return [];
  }
}

function initState() {
  tableState = loadState();

  // 將 tableState 中的項目加入 table
  tableState.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td id="newtr">${item.text}</td><td>${
      item.minutes < 10 ? "0" + item.minutes : item.minutes
    }:${
      item.seconds < 10 ? "0" + item.seconds : item.seconds
    }</td><td><button class="deletebutton">刪除</button></td>`;
    table.appendChild(tr);
  });
}

// Load the state when the page is loaded
window.onload = function () {
  initState();
  removeInitialSpan();
};

// Save the state to local storage
function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(tableState));
}

// 以下是 timer display
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

// 以下是 Focus Start 和 Focus Stop 功能
// 輸入專注項目，並在按下 Focus Start 時，將專注項目加入 itemState
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

  // 將專注項目加入 itemState
  itemState.unshift(text);

  // 隱藏輸入框、隱藏 Focus Start、顯示 Focus Stop 按鈕
  buttonStart.style.display = "none";
  buttonStop.style.display = "inline-block";
  inputText.style.display = "none";
}

// 按下 Focus Stop 時，將專注項目、計時器時間、刪除按鈕加入 Done List
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

  // 移除 id = example 的範例 table row
  if (example) {
    example.remove();
  }

  // 取得專注項目
  const text = itemState.pop();

  // 清空 itemState
  itemState = [];

  // 創建刪除鍵
  const newButton = document.createElement("button");
  newButton.classList.add("deletebutton");
  newButton.innerHTML = "刪除";

  // 創建新的 table row 並將項目、計時器時間、按鈕添加到其中
  const tr = document.createElement("tr");
  tr.innerHTML = `<td id="newtr">${text}</td><td>${
    stoppedMinutes < 10 ? "0" + stoppedMinutes : stoppedMinutes
  }:${stoppedSeconds < 10 ? "0" + stoppedSeconds : stoppedSeconds}</td><td>${
    newButton.outerHTML
  }</td>`;

  // 將新的 table row 添加到 table 中
  table.appendChild(tr);

  // 顯示 Focus Start 按鈕、隱藏 Focus Stop 按鈕、顯示 input-focus-item
  buttonStop.style.display = "none";
  buttonStart.style.display = "inline-block";
  inputText.style.display = "block";

  // 將專注項目、計時器時間和刪除按鈕加入 tableState
  if (tr) {
    tableState.unshift({
      text: text,
      minutes: stoppedMinutes,
      seconds: stoppedSeconds,
    });
    saveState();
  } else {
    return;
  }
}

// Done List 的 deletebutton 效果
table.addEventListener("click", function (event) {
  if (event.target.classList.contains("deletebutton")) {
    const row = event.target.closest("tr");
    row.remove();

    // 從 tableState 中刪除對應的項目
    const text = row.querySelector("td").innerText;
    const index = tableState.findIndex((item) => item.text === text);
    if (index !== -1) {
      tableState.splice(index, 1); // 只刪除對應的項目
      saveState();
    }
  }
});
