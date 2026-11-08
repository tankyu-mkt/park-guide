// 言語ごとの文章のリスト（言語を増やすときは、ここに足します）
const translations = {
  ja: {
    site: "公園の正しい使い方",
    nav_home: "ホーム",
    nav_rules: "ルール",
    home_intro: "みんなが気持ちよく使えるように、公園のルールを紹介します。",
    btn_rules: "ルール",
    rules_title: "ルール",
    rule1: "ごみは持ち帰る",
    rule2: "犬のふんは持ち帰る",
    rule3: "ほかの人に気を配る",
    rule4: "花や木、遊具を大切にする",
    rule5: "ハトに餌をやらない",
    back_home: "ホームに戻る",
    title_home: "公園の正しい使い方",
    title_rules: "ルール | 公園の正しい使い方"
  },
  en: {
    site: "How to Use the Park Properly",
    nav_home: "Home",
    nav_rules: "Rules",
    home_intro: "Here are some park rules so that everyone can enjoy the park.",
    btn_rules: "Rules",
    rules_title: "Rules",
    rule1: "Take your trash home",
    rule2: "Take your dog's waste home",
    rule3: "Be considerate of others",
    rule4: "Take care of the flowers, trees, and playground equipment",
    rule5: "Do not feed the pigeons",
    back_home: "Back to Home",
    title_home: "How to Use the Park Properly",
    title_rules: "Rules | How to Use the Park Properly"
  }
};

const select = document.getElementById("language");

// 言語を切り替える
function setLanguage(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;

  // data-i18n がついた場所の文章を入れ替える
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t[el.dataset.i18n];
  });

  // タブのタイトルも入れ替える
  const titleKey = document.body.dataset.title;
  if (titleKey) {
    document.title = t[titleKey];
  }

  select.value = lang;

  // 選んだ言語を覚えておく（次のページでも同じ言語になる）
  try {
    localStorage.setItem("lang", lang);
  } catch (e) {}
}

// 前に選んだ言語があれば使う。なければ日本語
let saved = "ja";
try {
  saved = localStorage.getItem("lang") || "ja";
} catch (e) {}
if (!translations[saved]) {
  saved = "ja";
}

select.onchange = function () {
  setLanguage(select.value);
};

setLanguage(saved);
