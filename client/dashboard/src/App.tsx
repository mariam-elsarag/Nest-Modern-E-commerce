import { lazy, Suspense, useEffect } from "react";
import { languages } from "./common/constant/constant";
import { currentLanguageCode } from "./common/utils/switchLang";

import Cookies from "js-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import App_Layout from "./layout/App_Layout";
import Unauth_Layout from "./layout/Unauth_Layout";

// protect route
import Protect_Route from "./components/Protect_Route";
import { useTranslation } from "react-i18next";
import Public_Route from "./components/Public_Route";
import Full_Page_Loader from "./components/shared/loaders/Full_Page_Loader";

// public route
const Login = lazy(() => import("./pages/auth/Login"));
const Forget_Password = lazy(() => import("./pages/auth/Forget_Password"));
const Reset_Password = lazy(() => import("./pages/auth/Reset_Password"));
const Activate_Account = lazy(() => import("./pages/auth/Activate_Account"));

// protected route

const Statistics = lazy(() => import("./pages/statistics/Statistics"));

// reviews
const Reviews = lazy(() => import("./pages/reviews/Review"));

// users
const Users_List = lazy(() => import("./pages/users/User_List"));

// 404
const Page_Not_Found = lazy(() => import("./pages/404/Page_Not_Found"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protect_Route />,
    children: [
      {
        element: <App_Layout />,
        children: [
          { index: true, element: <Statistics /> },
          { path: "reviews", element: <Reviews /> },
          {
            path: "users",
            children: [
              {
                index: true,
                element: <Users_List />,
              },
            ],
          },
          { path: "*", element: <Page_Not_Found /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Public_Route />,
    children: [
      {
        element: <Unauth_Layout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "forget-password", element: <Forget_Password /> },
          { path: ":email/reset-password", element: <Reset_Password /> },
          { path: ":email/activate-account", element: <Activate_Account /> },
        ],
      },
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
    <Suspense fallback={<Full_Page_Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
