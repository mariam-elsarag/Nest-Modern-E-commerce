import { toast } from "react-toastify";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const handleError = <T extends FieldValues>(
  error: any,
  t,
  setError?: any
) => {
  const err = error?.response?.data;
  const details = err?.error?.email || err?.error?.password || err?.message;

  console.log(err, "error");
  if (
    details ===
    'duplicate key value violates unique constraint "UQ_9f16dbbf263b0af0f03637fa7b5"'
  ) {
    toast.error(t("category_title_unique"));
    setError("title", {
      type: "manual",
      message: "category_title_unique",
    });

    return;
  } else if (
    details ===
    'duplicate key value violates unique constraint "UQ_2934320e576aeacd3bd4326a6e0"'
  ) {
    toast.error(t("category_title_ar_unique"));
    setError("title_ar", {
      type: "manual",
      message: "category_title_ar_unique",
    });
    return;
  } else if (
    details?.includes("duplicate key value violates unique constraint")
  ) {
    toast.error(t("phone_exists"));
    setError("phone", {
      type: "manual",
      message: "phone_exists",
    });
    return;
  }
  const showToast = () => {
    toast.error(details || "Something went wrong. Please try again.");
  };

  switch (details) {
    case "OTP expired":
      toast.error(t("otp_expired"));
      setError("otp", {
        type: "manual",
        message: "otp_expired",
      });
      break;
    case "User not found":
      toast.error(t("user_not_found"));
      break;
    case "No OTP was generated for this user":
      toast.error(t("no_otp_generated"));
      break;
    case "Invalid Otp":
      toast.error(t("invalid_otp"));
      setError("otp", {
        type: "manual",
        message: "invalid_otp",
      });
      break;
    case "Email already exists":
      toast.error(t("email_exists"));
      setError("email", {
        type: "manual",
        message: "email_exists",
      });
      break;
    case "The email or password you entered is incorrect.":
      toast.error(t("invalid_credentials"));
      setError("email", {
        type: "manual",
        message: "invalid_credentials",
      });
      setError("password", {
        type: "manual",
        message: "invalid_credentials",
      });
      break;
    case "Your account has been blocked. Please contact support for more information.":
      toast.error(t("account_blocked"));
      break;
    case "Your account is not active. Please verify your account first. An OTP has been sent to your email for verification.":
      toast.error(t("account_not_active"));
      break;
    default:
      toast.error(t("network_error"));
      break;
  }
};
