import {
  isDevNews,
  isExcludedNews,
  scoreNews,
} from "./newsFilter";

type NewsItem = {
  title: string;
  link?: string;
  source?: string;
};

type OkSurfResponse = {
  Technology?: NewsItem[];
};

export async function getDevNews(): Promise<NewsItem> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const res = await fetch("https://ok.surf/api/v1/cors/news-section", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections: ["Technology"],
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("NEWS API ERROR:", res.status);

      return {
        title: "No dev news today aye",
      };
    }

    const json: OkSurfResponse = await res.json();
    const items = json?.Technology ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return { title: "There ain't no dev news today aye " };
    }

    const filtered = items.filter((item) => {
      const title = item?.title ?? "";

      return isDevNews(title) && !isExcludedNews(title);
    });

    const list = (filtered.length > 0 ? filtered : items).sort(
      (a, b) => scoreNews(b.title) - scoreNews(a.title),
    );

    const day = Math.floor(Date.now() / 86400000);

    const topNews = list.slice(0, Math.min(5, list.length));
    
    const index = day % topNews.length;

    return ( 
      topNews[index] ?? { 
        title: "No dev news today",
      } 
    );
  } catch (error) {
    console.log("NEWS ERROR:", error);
    
    return { 
      title: "No dev news today" 
    };
  } finally {
    clearTimeout(timeout);
  }
}
