import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Cookies from "js-cookie";

import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

const savedLang = Cookies.get("lang");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: "en",
    detection: {
      // Order of detection: check cookie first, then localStorage, then browser
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"], // save selected language here
    },
    lng: savedLang,
    interpolation: { escapeValue: false },
  });

export default i18n;
