import { Inter } from "next/font/google";

// primereact

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/tailwind-light/theme.css";

// toast

import "react-toastify/dist/ReactToastify.css";

import "./_assets/styles/config/tailwind_config.css";
import "./_assets/styles/base/style.css";
import AppProvider from "./_context/AppProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "E-commerce",
    template: "%s | E-commerce",
  },
  description:
    "Welcome to our e-commerce platform, where you can find a wide range of products at competitive prices. Shop with confidence and enjoy a seamless online shopping experience.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}  h-full antialiased`}>
      <body className="">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
