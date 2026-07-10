import fs from "node:fs/promises";
import path from "node:path";
import { getDevNews } from "./getDevNews";

export async function cacheNews() {
    const news = await getDevNews();
    const file = path.join(process.cwd(), "public/cache/news.json");
    await fs.writeFile(file, JSON.stringify(news, null, 2), "utf-8");
    return news;
}