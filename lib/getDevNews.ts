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

    if (!ids.length) {
        return "There ain't no dev news today aye"
    }

    const currentDay = Math.floor(Date.now() / 86400000);
    const limit = Math.min(ids.length, 20);
    const index = hash(`news-${user}-${currentDay}`) % limit

    const storyRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${ids[index]}.json`,
      { next: { revalidate: 3600 } },
    );

    const story: HNStory = await storyRes.json();

    if (!story || typeof story.title !== "string") {
        return "There ain't no dev news today⛵"
    }


    return story?.title ?? "No devs news today aye.";
  } catch {
    return "Dev world has retired today aye...";
  }
}