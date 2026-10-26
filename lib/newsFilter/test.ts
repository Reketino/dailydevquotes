import { explainNewsScore } from "../newsFilter";

console.log("Starting newsFilter tests...");

const testTitles = [
  "Next.js announces a new version",
  "Critical security vulnerability found in JavaScript package",
  "GitHub launches new AI developer tools",
  "Email security update",
  "You won't believe this shocking software story",
];

for (const title of testTitles) {
  console.log(explainNewsScore(title));
}

console.log("NewsFilter tests completed!");
