// フィードバックの送信：FormSubmit（無料のメール送信サービス）を使って、管理者にメールで届けます。
// 画面は移動せず、送信できたら「ありがとうございます！」と表示します。
const SEND_TO = "akisuteno815@gmail.com";
const ENDPOINT = "https://formsubmit.co/ajax/" + SEND_TO;

const form = document.getElementById("fbForm");
const typeEl = document.getElementById("type");
const messageEl = document.getElementById("message");
const sendBtn = document.getElementById("send");
const statusEl = document.getElementById("status");

// 文章が見つからないときの予備（lang.js が古くても、表示が消えないように）
const FALLBACK = {
  fb_thanks: "ありがとうございます！送信しました。",
  fb_error: "送信できませんでした。しばらくしてからもう一度お試しください。"
};

// メッセージを今の言語で表示（言語を切り替えても追従する）
function show(key) {
  const now = translations[document.documentElement.lang] || {};
  const ja = translations.ja || {};
  statusEl.dataset.i18n = key;
  statusEl.textContent = now[key] || ja[key] || FALLBACK[key] || key;
}

form.onsubmit = async function (e) {
  e.preventDefault();
  const message = messageEl.value.trim();
  if (!message) {
    return;
  }

  sendBtn.disabled = true;
  statusEl.dataset.i18n = "";
  statusEl.textContent = "…"; // 送信中
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
    // 返事がJSONでない場合もあるので、いったん文字として受け取る
    const text = await res.text();
    let data = {};
    try { data = JSON.parse(text); } catch (e) {}

    if (res.ok && (data.success === true || data.success === "true")) {
      show("fb_thanks");
      form.reset();
    } else {
      throw new Error(data.message || ("HTTP " + res.status));
    }
  } catch (err) {
    console.error("フィードバックの送信エラー:", err);
    show("fb_error");
    // 原因を探しやすいように、理由をカッコで添える（不要になったら消してOK）
    statusEl.textContent += " (" + (err.message || err) + ")";
  }
  sendBtn.disabled = false;
};
