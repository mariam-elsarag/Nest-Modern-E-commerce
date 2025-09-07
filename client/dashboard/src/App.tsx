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

const Login = lazy(() => import("./pages/auth/Login"));

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
    children: [{ path: "login", element: <Login /> }],
  },
]);
const App = () => {
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";

    Cookies.set("i18next", currentLanguageCode);
  }, [currentLanguage]);
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
