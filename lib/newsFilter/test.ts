import {
  explainNewsScore,
  isDevNews,
  isExcludedNews,
} from "../newsFilter";

console.log("Starting newsFilter tests...");

const testTitles = [
  "New JavaScript framework improves developer productivity",
  "Critical npm package vulnerability discovered",
  "Celebrity announces new AI business",
  "Football club launches a new website",
  "New AI model generates realistic images",
  "GitHub launches new developer tools",
  "Email security update",
  "New database technology improves query performance",
];

for (const title of testTitles) {
  console.log(explainNewsScore(title));
}

console.log("NewsFilter tests completed!");
