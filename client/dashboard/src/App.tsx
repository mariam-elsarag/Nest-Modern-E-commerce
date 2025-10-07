import { lazy, Suspense, useEffect } from "react";
import { languages } from "./common/constant/constant";
import { currentLanguageCode } from "./common/utils/switchLang";

import Cookies from "js-cookie";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
const Otp = lazy(() => import("./pages/auth/Otp"));

// protected route

const Statistics = lazy(() => import("./pages/statistics/Statistics"));

// reviews
const Reviews = lazy(() => import("./pages/reviews/Review"));

// products
const Product_List = lazy(() => import("./pages/product/Product_List"));
const Product_Management = lazy(
  () => import("./pages/product/Product_Management")
);

// reviews
const Order = lazy(() => import("./pages/order/Order"));

// users
const Users_List = lazy(() => import("./pages/users/User_List"));
const Users_Management = lazy(() => import("./pages/users/Manage_User"));

// contact
const Contact = lazy(() => import("./pages/contact/Contact"));

// setting
const Setting_layout = lazy(() => import("./pages/settings/Setting_Layout"));
const Setting = lazy(() => import("./pages/settings/Setting"));
const Setting_Colors = lazy(() => import("./pages/settings/Setting_Colors"));
const Setting_Categories_layout = lazy(
  () => import("./pages/settings/category/Category_Layout")
);
const Setting_Categories_list = lazy(
  () => import("./pages/settings/category/Setting_Categories")
);
const Setting_Categories_Mangment = lazy(
  () => import("./pages/settings/category/Category_Mangment")
);

// content
const Content_Layout = lazy(() => import("./pages/content/Content_Layout"));
const Content_Faq = lazy(() => import("./pages/content/faq/Faq"));
const Content_Faq_Layout = lazy(() => import("./pages/content/faq/Faq_Layout"));
const Content_Faq_managment = lazy(
  () => import("./pages/content/faq/Faq_Managment")
);
const Content_Privacy_And_Terms = lazy(
  () => import("./pages/content/Privacy_And_Terms")
);

//notification
const Notifications = lazy(() => import("./pages/notifcation/Notifications"));

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
          { path: "orders", element: <Order /> },
          { path: "contact", element: <Contact /> },
          { path: "notification", element: <Notifications /> },
          {
            path: "settings",
            element: <Setting_layout />,
            children: [
              { path: "main", element: <Setting /> },
              {
                path: "colors",
                element: <Setting_Colors />,
              },
              {
                path: "categories",
                element: <Setting_Categories_layout />,
                children: [
                  { index: true, element: <Setting_Categories_list /> },
                  { path: "create", element: <Setting_Categories_Mangment /> },
                  {
                    path: ":id/edit",
                    element: <Setting_Categories_Mangment />,
                  },
                ],
              },
            ],
          },
          {
            path: "website",
            element: <Content_Layout />,
            children: [
              {
                path: "faq",
                element: <Content_Faq_Layout />,
                children: [
                  { index: true, element: <Content_Faq /> },
                  {
                    path: ":id/edit",
                    element: <Content_Faq_managment />,
                  },
                  {
                    path: "create",
                    element: <Content_Faq_managment />,
                  },
                ],
              },

              {
                path: "terms-and-conditions",
                element: <Content_Privacy_And_Terms />,
              },
              {
                path: "privacy-policy",
                element: <Content_Privacy_And_Terms />,
              },
            ],
          },
          {
            path: "users",
            children: [
              {
                index: true,
                element: <Users_List />,
              },
              {
                path: "create",
                element: <Users_Management />,
              },
              { path: ":id/edit", element: <Users_Management /> },
            ],
          },
          {
            path: "products",
            children: [
              { index: true, element: <Product_List /> },
              {
                path: "create",
                element: <Product_Management />,
              },
              { path: ":id/edit", element: <Product_Management /> },
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
          { path: ":email/activate-account", element: <Otp /> },
          { path: ":email/verify-account", element: <Otp /> },
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
