export function truncateText(
  text: string,
  length: number,
  withDots: boolean = true
) {
  if (text.length <= length) {
    return text;
  }

  return `${text.substring(0, length)} ${withDots ? "..." : ""}`;
}
