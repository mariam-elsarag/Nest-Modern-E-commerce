import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || "ar";
  const messages = await import(`./messages/${locale}.json`).then(
    (m) => m.default,
  );

  return {
    locale,
    messages,
  };
});
