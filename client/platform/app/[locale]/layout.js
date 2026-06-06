import { NextIntlClientProvider } from "next-intl";
import Navbar from "../_components/layout/navbar/Navbar";
import Footer from "../_components/layout/footer/Footer";
import Newsletter from "../_components/layout/newsletter/Newsletter";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await import(`../../src/i18n/messages/${locale}.json`).then(
    (m) => m.default,
  );
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div lang={locale} dir={dir} className="main">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="min-h-dvh flex flex-col">
          <Navbar />
          <div className="flex flex-col gap-20 flex-1">
            <div className="flex-1">{children}</div>
            <div>
              <Newsletter />
              <Footer />
            </div>
          </div>
        </div>
      </NextIntlClientProvider>
    </div>
  );
}
