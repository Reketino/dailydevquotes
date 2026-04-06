import { hash } from "./hash";

type OkSurfResponse = {
  data?: {
    Techonology?: {
      items?: {
        title?: string;
      }[];
    };
  };
};

export async function getDevNews(): Promise<string> {
  try {
    const res = await fetch("https://ok.surf/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections: ["Technology"],
      }),
      next: { revalidate: 3600 },
    });

    const json: OkSurfResponse = await res.json();
    const items = json?.data?.Techonology?.items ?? [];

    if (!ids || ids.length === 0) {
      return "There ain't no dev news today aye";
    }

    const day = Math.floor(Date.now() / 86400000);
    const index = hash(`news-${user}-${day}`) % ids.length;
    const id = ids[index] ?? ids[0];

    const storyRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    );

    const story = await storyRes.json();

    if (!story || typeof story.title !== "string") {
      return "There ain't no dev news today⛵";
    }

    return story.title;
  } catch (err) {
    console.log("HN ERROR:", err);
    return "No dev news today";
  }
}
