export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

export const phonePattern = /^01[0125][0-9]{8}$/;

export const numberPattern = /^\d{1,10}(\.\d{0,2})?$/;
export const skuPattern = /^[A-Za-z]{3}-[A-Za-z]{3}-\d{3}$/;
