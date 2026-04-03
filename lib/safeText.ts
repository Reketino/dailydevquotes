export function safeText(str: string, max = 90): string {
  if (!str) return "No news";
  
  return str
  .replace(/[^\x00-\x7F]/g, "")
  .replace(/&[a-z]+;/gi, "")
  .replace(/[^a-zA-Z0-9 .,!?-]/g, "")
  .trim();

  return cleaned.length > 0


}


