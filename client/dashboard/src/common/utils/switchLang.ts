import Cookies from "js-cookie";
import i18n from "../../../I18n";

export let currentLanguageCode = Cookies.get("i18next") || "en";

export const switchLang = () => {
  const targetLanguage = currentLanguageCode === "en" ? "ar" : "en";
  Cookies.set("bareeq_i18next", targetLanguage);
  currentLanguageCode = targetLanguage;
  i18n.changeLanguage(targetLanguage);
};
