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

  const showToast = () => {
    toast.error(details || "Something went wrong. Please try again.");
  };

  switch (details) {
    default:
      toast.error(t("network_error"));
      break;
  }
};
