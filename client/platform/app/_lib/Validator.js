export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

export const phonePattern = /^01[0125][0-9]{8}$/;
export const validaition = {
  required: "required_field",

  email: {
    value: emailRegex,
    message: "email_pattern_error",
  },
  min: (t, type = "value", value = 1) => ({
    value: value,
    message: `${t(`min_${type}`, { value })}`,
  }),
  max: (t, type = "value", value = 100) => ({
    value: value,
    message: `${t(`max_${type}`, { value })}`,
  }),
  textarea: (t, type = "value", value = 250) => ({
    value: value,
    message: `${t(`max_${type}`, { value })}`,
  }),
};
