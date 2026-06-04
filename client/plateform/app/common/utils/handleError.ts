// import { toast } from "react-toastify";
// import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

// export const handleError = <T extends FieldValues>(
//   error: any,
//   t,
//   setError?: any,
// ) => {
//   const err = error?.response?.data;
//   const details = err?.error?.email || err?.error?.password || err?.message;
//   if (details?.includes("duplicate key value violates unique constraint")) {
//     toast.error(t("phone_exists"));
//     setError("phone", {
//       type: "manual",
//       message: "phone_exists",
//     });
//     return;
//   }

//   if (err.message === "Invalid cart items") {
//     toast.error(t("invalid_cart_items_remove_them_to_procced"));
//     return;
//   }

//   switch (details) {
//     case "OTP expired":
//       toast.error(t("otp_expired"));
//       setError("otp", {
//         type: "manual",
//         message: "otp_expired",
//       });
//       break;
//     case "User not found":
//       toast.error(t("user_not_found"));
//       break;
//     case "No OTP was generated for this user":
//       toast.error(t("no_otp_generated"));
//       break;
//     case "Invalid Otp":
//       toast.error(t("invalid_otp"));
//       setError("otp", {
//         type: "manual",
//         message: "invalid_otp",
//       });
//       break;
//     case "Email already exists":
//       toast.error(t("email_exists"));
//       setError("email", {
//         type: "manual",
//         message: "email_exists",
//       });
//       break;
//     case "Your account is not active. Please verify your account first. An OTP has been sent to your email for verification.":
//       toast.error(t("account_not_active"));
//       break;
//     case "The email or password you entered is incorrect.":
//       toast.error(t("invalid_credentials"));
//       setError("email", {
//         type: "manual",
//         message: "invalid_credentials",
//       });
//       setError("password", {
//         type: "manual",
//         message: "invalid_credentials",
//       });
//       break;
//     case "Your account has been blocked. Please contact support for more information.":
//       toast.error(t("account_blocked"));
//       break;
//     case "New password cannot be the same as the old password.":
//       toast.error(t("new_password_same_as_old"));
//       setError("password", {
//         type: "manual",
//         message: "new_password_same_as_old",
//       });
//       break;
//     case "Incorrect old password.":
//       toast.error(t("incorrect_old_password"));
//       setError("oldPassword", {
//         type: "manual",
//         message: "incorrect_old_password",
//       });
//       break;
//     default:
//       toast.error(t("network_error"));
//       break;
//   }
// };
import { toast } from "react-toastify";
import type { FieldValues, UseFormSetError, Path } from "react-hook-form";

type ApiError = {
  response?: {
    data?: {
      message?: string;
      error?: Record<string, string>;
    };
  };
};

export const handleError = <T extends FieldValues>(
  error: ApiError,
  t: (key: string) => string,
  setError?: UseFormSetError<T>,
  allowedFields: (keyof T)[] = [],
) => {
  const data = error?.response?.data;

  // network / server error
  if (!data) {
    toast.error(t("network_error"));
    return;
  }

  const fieldErrors = data.error;

  // handle field errors
  if (fieldErrors && typeof fieldErrors === "object") {
    Object.entries(fieldErrors).forEach(([key, value]) => {
      const isAllowed = allowedFields.includes(key as keyof T);

      if (isAllowed && setError) {
        setError(key as Path<T>, {
          type: "manual",
          message: value,
        });
      } else {
        toast.error(t(value));
      }
    });

    return;
  }

  // fallback message
  if (data.message) {
    toast.error(t(data.message));
    return;
  }

  toast.error(t("network_error"));
};
