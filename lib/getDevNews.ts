type OkSurfResponse = {
  data?: {
    Technology?: {
      items?: {
        title?: string;
      }[];
    };
  };
};

export async function getDevNews(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://ok.surf/api/v1/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sections: ["Technology"] }),
      next: { revalidate: 3600 },
    });
    clearTimeout(timeout);
    console.log("STATUS:", res.status);
    console.log("CONTENT TYPE:", res.headers.get("content-type"));

    const json: OkSurfResponse = await res.json();
    console.log("OKSURF RESPONSE:")
    console.log(JSON.stringify(json, null, 2));
    const items = json?.data?.Technology?.items ?? [];

    if (!items.length) {
      return "There ain't no dev news today aye";
    }

    const day = Math.floor(Date.now() / 86400000);
    const index = day % items.length;

    return items[index]?.title ?? "No dev news today";
  } catch (err) {
    console.log("NEWS ERROR:", err);
    return "No dev news today";
  }
}
