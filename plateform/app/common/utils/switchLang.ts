import i18n from "../../../i18n";
import Cookies from "js-cookie";

export let currentLanguageCode = Cookies.get("i18next") || "en";
export function switchLang(lang?: "en" | "ar") {
  const targetLanguage = lang
    ? lang
    : currentLanguageCode === "en"
      ? "ar"
      : "en";

  document.documentElement.dir = targetLanguage === "ar" ? "rtl" : "ltr";
  Cookies.set("lang", targetLanguage, { expires: 365 });
  currentLanguageCode = targetLanguage;
  i18n.changeLanguage(targetLanguage);
}
