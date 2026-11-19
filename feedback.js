// フィードバックの送信：GitHubの「Issues」に投稿する形です
// このサイトのGitHubリポジトリ（ユーザー名/リポジトリ名）。名前を変えたら、ここも直してください。
const REPO = "tankyu-mkt/park-guide";

const form = document.getElementById("fbForm");
const typeEl = document.getElementById("type");
const messageEl = document.getElementById("message");
const statusEl = document.getElementById("status");

// メッセージを今の言語で表示（言語を切り替えても追従する）
function show(key) {
  statusEl.dataset.i18n = key;
  statusEl.textContent = translations[document.documentElement.lang][key];
}

form.onsubmit = function (e) {
  e.preventDefault();
  const message = messageEl.value.trim();
  if (!message) {
    return;
  }
  const type = typeEl.value;
  const title = "[" + type + "] " + message.slice(0, 40);
  const body = message + "\n\n(lang: " + document.documentElement.lang + ")";
  const url = "https://github.com/" + REPO + "/issues/new" +
    "?title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body);

  // 新しいタブでGitHubの投稿画面を開く（開けなければ、このタブで開く）
  const w = window.open(url, "_blank");
  if (w) {
    w.opener = null;
  } else {
    location.href = url;
  }
  show("fb_opened");
  form.reset();
};
