import axios from "axios";
import { apiKey } from "./apiUrl";
import Cookies from "js-cookie";
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
    console.log(error, "sk");
    return Promise.reject(error);
  }
);

export default axiosInstance;
