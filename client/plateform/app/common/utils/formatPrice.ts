export function formatPrice(
  value: number,
  locale: string = "en-US",
  currency: string = "USD"
): string {
  if (isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
