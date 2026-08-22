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

export function isExcludedNews(title: string) {
  const t = title.toLowerCase();

  return (
    t.includes("celebrity") || t.includes("sports") || t.includes("fotball")
  );
}

export function scoreNews(title: string) {
  const t = title.toLowerCase();

  let score = 0;

  if (t.includes("next.js")) score += 10;
  if (t.includes("react")) score += 9;
  if (t.includes("typescript")) score += 9;
  if (t.includes("javascript")) score += 8;
  if (t.includes("python")) score += 8;
  if (/\bai\b/.test(t)) score += 8;
  if (t.includes("artificial intelligence")) score += 8;
  if (t.includes("github")) score += 7;
  if (t.includes("open source")) score += 7;
  if (t.includes("security")) score += 6;
  if (t.includes("developer")) score += 6;
  if (t.includes("software")) score += 5;
  if (t.includes("programming")) score += 5;
  if (t.includes("code")) score += 4;

  return score;
}
