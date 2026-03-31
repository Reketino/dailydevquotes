import { hash } from "./hash"

type HNStory = {
    title?: string;
}

export async function getDevNews(user: string): Promise<string> {
  try {
    const idsRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 3600 } },
    );

    const ids: number[] = await idsRes.json();
    const day = Math.floor(Date.now() / 86400000);
    const index = hash(`news-${user}-${day}`) % Math.min(ids.length, 20);

    const storyRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${ids[index]}.json`,
      { next: { revalidate: 3600 } },
    );
    const story: HNStory = await storyRes.json();

    return story?.title ?? "No devs news today aye.";
  } catch {
    return "Dev world has retired today aye...";
  }
}