type NewsItem = {
  title: string;
  link?: string;
  source?: string;
};

type OkSurfResponse = {
  Technology?: NewsItem[];
}

function isDevNews(title: string) {
  const t = title.toLowerCase()

  return (
    t.includes("ai") ||
    t.includes("developer") ||
    t.includes("software") ||
    t.includes("programming") ||
    t.includes("code") ||
    t.includes("security") 
  );
}

export async function getDevNews(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
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

    const json: OkSurfResponse = await res.json();
    const items = json?.Technology ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return "There ain't no dev news today aye";
    }

    const filtered = items.filter(item =>
      isDevNews(item?.title ?? "")
    );

    const list = filtered.length > 0 ? filtered : items;

    const day = Math.floor(Date.now() / 86400000);
    const index = day % items.length;

    return list[index]?.title ?? "No dev news today";
  } catch (err) {
    console.log("NEWS ERROR:", err);
    return "No dev news today";
  }
}
