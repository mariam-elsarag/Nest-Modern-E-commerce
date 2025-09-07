import { currentLanguageCode } from "./switchLang";

export const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const locale = currentLanguageCode === "ar" ? "ar" : "en-US";

  return new Intl.DateTimeFormat(locale, options)
    .format(date)
    .replace(/,/g, "");
};
