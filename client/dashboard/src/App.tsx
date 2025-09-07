import React, { lazy, Suspense, useEffect } from "react";
import { languages } from "./common/constant/constant";
import { currentLanguageCode, switchLang } from "./common/utils/switchLang";

import Cookies from "js-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import App_Layout from "./layout/App_Layout";
import Unauth_Layout from "./layout/Unauth_Layout";

// protect route
import Protect_Route from "./components/Protect_Route";
import { useTranslation } from "react-i18next";

const Login = lazy(() => import("./pages/auth/Login"));
const Forget_Password = lazy(() => import("./pages/auth/Forget_Password"));
const Reset_Password = lazy(() => import("./pages/auth/Reset_Password"));
const Activate_Account = lazy(() => import("./pages/auth/Activate_Account"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protect_Route />,
    children: [
      {
        element: <App_Layout />,
        children: [
          {
            index: true,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Unauth_Layout />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "forget-password",
        element: <Forget_Password />,
      },
      { path: ":email/reset-password", element: <Reset_Password /> },
      { path: ":email/activate-account", element: <Activate_Account /> },
      { path: "*", element: <Login /> },
    ],
  },
]);
const App = () => {
  const { t } = useTranslation();
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";

    Cookies.set("i18next", currentLanguageCode);
  }, [currentLanguage, t]);
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
