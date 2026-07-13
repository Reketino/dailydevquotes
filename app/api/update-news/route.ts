import { cacheNews } from "@/lib/cacheNews";

export async function GET() {
    const news = await cacheNews();
    
}