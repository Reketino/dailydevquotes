export function isDevNews(title: string) {
  const t = title.toLowerCase();

  return (
    /\bai\b/.test(t) ||
    t.includes("artificial intelligence") ||
    t.includes("developer") ||
    t.includes("software") ||
    t.includes("programming") ||
    t.includes("code") ||
    t.includes("security") ||
    t.includes("github") ||
    t.includes("open source") ||
    t.includes("javascript") ||
    t.includes("typescript") ||
    t.includes("python") ||
    t.includes("react") ||
    t.includes("next.js")
  );
}