export function formatPrice(value, locale = "en-US", currency = "USD") {
  if (isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
