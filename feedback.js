// フィードバックの送信：FormSubmit（無料のメール送信サービス）を使って、管理者にメールで届けます。
// 画面は移動せず、送信できたら「ありがとうございます！」と表示します。
const SEND_TO = "akisuteno815@gmail.com";
const ENDPOINT = "https://formsubmit.co/ajax/" + SEND_TO;

const form = document.getElementById("fbForm");
const typeEl = document.getElementById("type");
const messageEl = document.getElementById("message");
const sendBtn = document.getElementById("send");
const statusEl = document.getElementById("status");

// メッセージを今の言語で表示（言語を切り替えても追従する）
function show(key) {
  statusEl.dataset.i18n = key;
  statusEl.textContent = translations[document.documentElement.lang][key];
}

form.onsubmit = async function (e) {
  e.preventDefault();
  const message = messageEl.value.trim();
  if (!message) {
    return;
  }

  sendBtn.disabled = true;
  statusEl.textContent = "";
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "[公園サイト] " + typeEl.value,
        _captcha: "false",
        _template: "table",
        type: typeEl.value,
        message: message,
        lang: document.documentElement.lang
      })
    });
    const data = await res.json();
    if (!res.ok || !(data.success === true || data.success === "true")) {
      throw new Error("send failed");
    }
    show("fb_thanks");
    form.reset();
  } catch (err) {
    show("fb_error");
  }
  sendBtn.disabled = false;
};
