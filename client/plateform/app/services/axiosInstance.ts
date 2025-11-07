import axios from "axios";
import { apiKey } from "./apiUrl";
import Cookies from "js-cookie";
import { currentLanguageCode } from "~/common/utils/switchLang";
import { toast } from "react-toastify";

let onLogout;
let showExpireTokenToast = false;
export const setLogoutHandler = (fn) => {
  onLogout = fn;
};
const axiosInstance = axios.create({
  baseURL: apiKey,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const details = error.response.data.message;
    console.log(details, "skskjfkdjkfdj");
    let message;
    if (details === "Invalid or expired token.") {
      message =
        currentLanguageCode === "en"
          ? "Your session has expired. Please log in again."
          : "انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.";

      if (!showExpireTokenToast) {
        showExpireTokenToast = true;
        toast.error(message);
      }
      Cookies.remove("token");
      if (onLogout) onLogout();
    }
    console.log(error, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;
