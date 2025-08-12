import fr from "../translations/fr.json";
import en from "../translations/en.json";

const translations = { fr, en };

let currentLang = "fr";

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLang = lang;
  } else {
    console.warn(
      `Langue "${lang}" non trouvée, utilisation de "${currentLang}".`
    );
  }
};

export const trans = (key) => {
  const keys = key.split(".");

  let value = translations[currentLang];

  for (let k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  return value || key;
};
