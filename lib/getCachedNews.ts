import fs from "node:fs/promises";
import path from "node:path";

export async function getCachedNews() {
   const file = path.join(process.cwd(), "public/cache/news.json"); 
}