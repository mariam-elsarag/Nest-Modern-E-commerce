export const apiKey = import.meta.env.VITE_API_URL;
export const API = {
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
    add_admin: "",
  },
  review: {
    list: "",
  },
  orders: {
    list: "",
  },
  product: {
    main: "",
  },
  contact: {
    main: "",
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
};
