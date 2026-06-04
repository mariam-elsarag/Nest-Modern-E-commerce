import React from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthContext";
const AppProvider = ({ children }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AppProvider;
