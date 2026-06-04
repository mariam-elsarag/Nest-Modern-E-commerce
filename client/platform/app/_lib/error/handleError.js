export const handleError = (error, t, setError, allowedFields) => {
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
      const isAllowed = allowedFields.includes(key);

      if (isAllowed && setError) {
        setError(key, {
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
