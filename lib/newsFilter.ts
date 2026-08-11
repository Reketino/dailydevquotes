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
    t.includes("celebrity") ||
    t.includes("sports") ||
    t.includes("fotball")
  );
}

 export function scoreNews(title: string) {
  const t = title.toLowerCase();

  let score = 0;

  if (t.includes("next.js")) score += 10;
  if (t.includes("react")) score += 9;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  if (t.includes("next.js")) score += 10;
  
  return score;
}