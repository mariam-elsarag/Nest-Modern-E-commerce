import { toast } from "react-toastify";

export const handleError = (error, t, setError, allowedFields = []) => {
  const data = error?.response?.data || error || null;

  console.log(data, "error");

  if (!data) {
    toast.error(t("network_error"));
    return;
  }

  // Field errors (if backend sends object errors)
  const fieldErrors = data?.error;

  if (fieldErrors && typeof fieldErrors === "object") {
    Object.entries(fieldErrors).forEach(([key, value]) => {
      const isAllowed = allowedFields.includes(key);

      if (isAllowed && setError) {
        setError(key, {
          type: "manual",
          message: value,
        });
      } else {
        toast.error(value);
      }
    });

    return;
  }

  if (data?.message) {
    toast.error(data.message);
    return;
  }

  toast.error(t("network_error"));
};
