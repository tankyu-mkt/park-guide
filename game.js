// ごみひろいゲーム
const GAME_SECONDS = 30;

// グローバルランキングの保存先（FirebaseのデータベースURL）。
// 空のままだと、グローバルランキングは表示されません（ローカルだけ動きます）。
// 例: "https://park-guide-xxxxx-default-rtdb.asia-southeast1.firebasedatabase.app"
const GLOBAL_DB_URL = "";
const ITEMS = ["🥤", "🍌", "📰", "🍾", "🥫", "🧃"];

const field = document.getElementById("field");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start");
const finishEl = document.getElementById("finish");
const saveRow = document.getElementById("saveRow");
const nameInput = document.getElementById("name");
const saveBtn = document.getElementById("save");
const rankingEl = document.getElementById("ranking");
const globalBox = document.getElementById("globalBox");
const globalEl = document.getElementById("globalRanking");

let score = 0;
let timeLeft = GAME_SECONDS;
let tickTimer = null;
let spawnTimer = null;

// 今の言語の文章を取り出す
function text(key) {
  return translations[document.documentElement.lang][key];
}

// ごみを1つ出す（1.5秒で消える）
function spawn() {
  const el = document.createElement("span");
  el.className = "litter";
  el.textContent = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  el.style.left = Math.random() * 85 + "%";
  el.style.top = Math.random() * 80 + "%";
  el.onclick = function () {
    score = score + 1;
    scoreEl.textContent = score;
    el.remove();
  };
  field.appendChild(el);
  setTimeout(function () { el.remove(); }, 1500);
}

function startGame() {
  score = 0;
  timeLeft = GAME_SECONDS;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  field.innerHTML = "";
  finishEl.hidden = true;
  startBtn.hidden = true;
  tickTimer = setInterval(tick, 1000);
  spawnTimer = setInterval(spawn, 600);
  spawn();
}

function tick() {
  timeLeft = timeLeft - 1;
  timeEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(tickTimer);
  clearInterval(spawnTimer);
  field.innerHTML = "";
  finishEl.hidden = false;
  saveRow.hidden = false;
  startBtn.dataset.i18n = "game_retry";
  startBtn.textContent = text("game_retry");
  startBtn.hidden = false;
}

// ランキング（この端末のブラウザに保存）
function loadRanking() {
  try {
    return JSON.parse(localStorage.getItem("parkRanking")) || [];
  } catch (e) {
    return [];
  }
}

function saveRanking(list) {
  try {
    localStorage.setItem("parkRanking", JSON.stringify(list));
  } catch (e) {}
}

function showRanking() {
  rankingEl.innerHTML = "";
  loadRanking().forEach(function (r) {
    const li = document.createElement("li");
    li.textContent = r.name + " — " + r.score;
    rankingEl.appendChild(li);
  });
}

// グローバルランキング（みんなのベスト10）を読み込んで表示
async function showGlobalRanking() {
  if (!GLOBAL_DB_URL) {
    return;
  }
  globalBox.hidden = false;
  try {
    const res = await fetch(GLOBAL_DB_URL + "/scores.json?orderBy=%22score%22&limitToLast=10");
    if (!res.ok) {
      throw new Error("load failed");
    }
    const data = await res.json();
    const list = Object.values(data || {});
    list.sort(function (a, b) { return b.score - a.score; });
    globalEl.innerHTML = "";
    list.forEach(function (r) {
      const li = document.createElement("li");
      li.textContent = r.name + " — " + r.score;
      globalEl.appendChild(li);
    });
  } catch (e) {
    globalEl.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = text("game_global_error");
    globalEl.appendChild(li);
  }
}

// スコアをグローバルランキングに送る
async function sendGlobalScore(name, score) {
  if (!GLOBAL_DB_URL) {
    return;
  }
  try {
    await fetch(GLOBAL_DB_URL + "/scores.json", {
      method: "POST",
      body: JSON.stringify({ name: name, score: score })
    });
  } catch (e) {}
}

async function saveScore() {
  const name = nameInput.value.trim() || text("game_anon");
  const list = loadRanking();
  list.push({ name: name, score: score });
  list.sort(function (a, b) { return b.score - a.score; });
  saveRanking(list.slice(0, 5));
  showRanking();
  saveRow.hidden = true;
  await sendGlobalScore(name, score);
  showGlobalRanking();
}

startBtn.onclick = startGame;
saveBtn.onclick = saveScore;
showRanking();
showGlobalRanking();
