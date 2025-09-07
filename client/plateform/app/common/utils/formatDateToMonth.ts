import { currentLanguageCode } from "./switchLang";

export const formatDateToMonth = (dateStr) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const locale = currentLanguageCode === "ar" ? "ar" : "en-US";

  return new Intl.DateTimeFormat(locale, options)
    .format(date)
    .replace(/,/g, "");
};
