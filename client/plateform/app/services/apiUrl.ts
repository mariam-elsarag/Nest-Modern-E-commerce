export const apiKey = import.meta.env.VITE_API_URL;
export const API = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    sendOtp: "/api/auth/send-otp",
    verifyOtp: "/api/auth/verify-otp",
    resetPassword: "/api/auth/reset-password",
  },
  home: {
    highlights: "/api/v1/product/highlights",
  },
  list: {
    categories: "/api/category/product",
    colors: "/api/color/product",
    sizes: "/api/size/product",
  },
  favorite: "/api/v1/favorite",
  profile: {
    profile: "/api/v1/profile",
  },
  support: "/api/v1/support",
  products: "/api/v1/product",
  reviews: "/reviews",
  cart: "/api/v1/cart",
};
