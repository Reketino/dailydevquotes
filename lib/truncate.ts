export function truncate(str: string, max = 90): string {
  if (!str) return "";

  return str.length > max ? str.slice(0, max) + "…" : str;
}
