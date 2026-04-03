import { hash } from "./hash";

type HNStory = {
  title?: string;
};

export async function getDevNews(user: string): Promise<string> {
  try {
    const idsRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 3600 } },
    );

    const ids: number[] = await idsRes.json();

    if (!ids || ids.length === 0) {
      return "There ain't no dev news today aye";
    }

    const day = Math.floor(Date.now() / 86400000);
    const index = hash(`news-${user}-${day}`) % ids.length;
    const id = ids[index] ?? ids[0];

    const storyRes = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );

    const story = await storyRes.json();

    if (!story || typeof story.title !== "string") {
      return "There ain't no dev news today⛵";
    }
  
    return story.title;
    } catch (err) {
      console.log("HN ERROR:", err);
      return "No dev news today"
    }
    } 
