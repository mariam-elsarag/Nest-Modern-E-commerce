export const apiKey = import.meta.env.VITE_API_URL;
export const API = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    sendOtp: "/api/auth/send-otp",
    verifyOtp: "/api/auth/verify-otp",
  },
  products: "/products",
  reviews: "/reviews",
  categories: "/categories",
  colors: "/colors",
  sizes: "/sizes",
  cart: "/cart",
};
