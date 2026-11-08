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
  },
  "zh-CN": {
    site: "公园的正确使用方法",
    nav_home: "首页",
    nav_rules: "规则",
    home_intro: "为了让大家都能舒适地使用公园，这里介绍公园的规则。",
    btn_rules: "规则",
    rules_title: "规则",
    rule1: "垃圾请带走",
    rule2: "请带走狗狗的粪便",
    rule3: "关心身边的其他人",
    rule4: "爱护花草树木和游乐设施",
    rule5: "不要喂鸽子",
    back_home: "返回首页",
    title_home: "公园的正确使用方法",
    title_rules: "规则 | 公园的正确使用方法"
  },
  "zh-TW": {
    site: "公園的正確使用方法",
    nav_home: "首頁",
    nav_rules: "規則",
    home_intro: "為了讓大家都能舒適地使用公園，在此介紹公園的規則。",
    btn_rules: "規則",
    rules_title: "規則",
    rule1: "垃圾請帶走",
    rule2: "請帶走狗狗的糞便",
    rule3: "關心身邊的其他人",
    rule4: "愛護花草樹木和遊樂設施",
    rule5: "不要餵鴿子",
    back_home: "返回首頁",
    title_home: "公園的正確使用方法",
    title_rules: "規則 | 公園的正確使用方法"
  },
  "ko": {
    site: "공원 올바르게 이용하는 방법",
    nav_home: "홈",
    nav_rules: "규칙",
    home_intro: "모두가 기분 좋게 이용할 수 있도록 공원의 규칙을 소개합니다.",
    btn_rules: "규칙",
    rules_title: "규칙",
    rule1: "쓰레기는 가져가기",
    rule2: "반려견의 배설물은 가져가기",
    rule3: "주변 사람을 배려하기",
    rule4: "꽃과 나무, 놀이기구를 소중히 다루기",
    rule5: "비둘기에게 먹이를 주지 않기",
    back_home: "홈으로 돌아가기",
    title_home: "공원 올바르게 이용하는 방법",
    title_rules: "규칙 | 공원 올바르게 이용하는 방법"
  },
  "de": {
    site: "So nutzt man den Park richtig",
    nav_home: "Startseite",
    nav_rules: "Regeln",
    home_intro: "Damit alle den Park angenehm nutzen können, stellen wir hier die Parkregeln vor.",
    btn_rules: "Regeln",
    rules_title: "Regeln",
    rule1: "Nehmen Sie Ihren Müll wieder mit",
    rule2: "Nehmen Sie den Hundekot Ihres Hundes mit",
    rule3: "Nehmen Sie Rücksicht auf andere",
    rule4: "Gehen Sie sorgsam mit Blumen, Bäumen und Spielgeräten um",
    rule5: "Füttern Sie keine Tauben",
    back_home: "Zurück zur Startseite",
    title_home: "So nutzt man den Park richtig",
    title_rules: "Regeln | So nutzt man den Park richtig"
  },
  "fr": {
    site: "Bien utiliser le parc",
    nav_home: "Accueil",
    nav_rules: "Règles",
    home_intro: "Voici les règles du parc pour que tout le monde puisse en profiter agréablement.",
    btn_rules: "Règles",
    rules_title: "Règles",
    rule1: "Remportez vos déchets",
    rule2: "Ramassez les déjections de votre chien",
    rule3: "Soyez attentif aux autres",
    rule4: "Respectez les fleurs, les arbres et les jeux",
    rule5: "Ne nourrissez pas les pigeons",
    back_home: "Retour à l'accueil",
    title_home: "Bien utiliser le parc",
    title_rules: "Règles | Bien utiliser le parc"
  },
  "it": {
    site: "Come usare correttamente il parco",
    nav_home: "Home",
    nav_rules: "Regole",
    home_intro: "Ecco le regole del parco, perché tutti possano goderselo in serenità.",
    btn_rules: "Regole",
    rules_title: "Regole",
    rule1: "Porta via i tuoi rifiuti",
    rule2: "Raccogli gli escrementi del tuo cane",
    rule3: "Abbi riguardo per gli altri",
    rule4: "Rispetta fiori, alberi e giochi",
    rule5: "Non dare da mangiare ai piccioni",
    back_home: "Torna alla home",
    title_home: "Come usare correttamente il parco",
    title_rules: "Regole | Come usare correttamente il parco"
  },
  "es": {
    site: "Cómo usar bien el parque",
    nav_home: "Inicio",
    nav_rules: "Normas",
    home_intro: "Estas son las normas del parque para que todos podamos disfrutarlo.",
    btn_rules: "Normas",
    rules_title: "Normas",
    rule1: "Llévate tu basura",
    rule2: "Recoge los excrementos de tu perro",
    rule3: "Ten consideración con los demás",
    rule4: "Cuida las flores, los árboles y los juegos infantiles",
    rule5: "No des de comer a las palomas",
    back_home: "Volver al inicio",
    title_home: "Cómo usar bien el parque",
    title_rules: "Normas | Cómo usar bien el parque"
  },
  "pt": {
    site: "Como usar bem o parque",
    nav_home: "Início",
    nav_rules: "Regras",
    home_intro: "Estas são as regras do parque para que todos possam aproveitá-lo.",
    btn_rules: "Regras",
    rules_title: "Regras",
    rule1: "Leve o seu lixo embora",
    rule2: "Recolha as fezes do seu cão",
    rule3: "Tenha consideração pelos outros",
    rule4: "Cuide das flores, das árvores e dos brinquedos",
    rule5: "Não dê comida aos pombos",
    back_home: "Voltar ao início",
    title_home: "Como usar bem o parque",
    title_rules: "Regras | Como usar bem o parque"
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
