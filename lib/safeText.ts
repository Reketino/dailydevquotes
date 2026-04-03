export function safeText(str: string, max = 90): string {
  return str
  .replace(/[^\x00-\x7F]/g, "")
  .replace(/&[a-z]+;/gi, "")
  .trim()
  .slice(0, max);
}


