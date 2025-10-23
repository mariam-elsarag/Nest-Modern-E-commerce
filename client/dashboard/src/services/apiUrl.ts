export const apiKey = import.meta.env.VITE_API_URL;
export const API = {
  list: {
    category: "/api/category/list",
    size: "/api/size",
  },
  auth: {
    login: "/api/auth/login",
    sendOtp: "/api/auth/send-otp",
    verifyOtp: "/api/auth/verify-otp",
    resetPassword: "/api/auth/reset-password",
  },
  dashboard: {
    latestOrders: "",
  },
  users: {
    list: "/api/admin/users",
    add_admin: "/api/admin/users",
  },
  review: {
    list: "",
  },
  orders: {
    list: "",
  },
  product: {
    main: "/api/v1/admin/product",
  },
  contact: {
    main: "/api/v1/admin/support",
  },
  notification: {
    list: "",
    update: "",
  },
  website: {
    terms: "",
    privacy: "",
    faq: "",
  },
  settting: {
    color: "/api/color",
    category: "/api/category",
    setting: "/api/admin/settings",
  },
};
