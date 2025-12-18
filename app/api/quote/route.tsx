import { ImageResponse } from "@vercel/og";
import { relative } from "path";

export const runtime = "edge";

const emojis = ["☠️", "🔥", "🧠", "🥴", "🤡", "🚀", "🃏", "🪖"];

const QUOTES_URL =
  "https://raw.githubusercontent.com/Reketino/dev-quotes/master/quotes.json";

  type Mood = "chaos" | "pain" | "fun" | "wisdom";

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") ?? "guest";
  const theme = searchParams.get("theme") ?? "dark";

  const res = await fetch(QUOTES_URL, {
    next: { revalidate: 86400 },
  });

  const rawQuotes: any[] = await res.json();

  const day = Math.floor(Date.now() / 86400000);
  const index = hash(`${user}-${day}`) % rawQuotes.length;

   const raw = rawQuotes[index];

const text: string =
typeof raw === "string"
? raw
: typeof raw?.text === "string"
? raw.text 
: "Code is hard. Life is harder.";

const mood: Mood = 
typeof raw === "object" && raw?.mood
? raw.mood 
: "chaos";

  const emojiIndex = hash(`emoji-${user}-${day}`) % emojis.length;
  const emoji = emojis[emojiIndex];

  const themes = {
    dark: {
      background: "linear-gradient(135deg, #020617, #0f172a)",
      text: "#e5e7eb",
    },
    light: {
      background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
      text: "#020617",
    },
    tokyonight: {
      background: "linear-gradient(135deg, #1a1b26, #24283b)",
      text: "#c0caf5",
    },
  };

  const themeKey =
    theme === "tokyo-night" || theme === "tokyo" ? "tokyonight" : theme;

  const activeTheme = themes[themeKey as keyof typeof themes] ?? themes.dark;

  const emojiSize =
    themeKey === "light" ? 48 : themeKey === "tokyonight" ? 60 : 56;

  const grainByMood: Record<
  Mood, 
  { opacity: number }
  > = {
    chaos: { opacity: 0.006 },
    pain: { opacity: 0.04, },
    fun: { opacity: 0.05,  },
    wisdom: { opacity: 0.025 },
  };

  const grain = grainByMood[mood]

  return new ImageResponse(
    (
      <main
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: activeTheme.background,
          color: activeTheme.text,
          padding: 60,
          textAlign: "center",
          fontSize: 32,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
      <section
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: grain.opacity,
        pointerEvents: "none",
      }}
      />
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", fontSize: emojiSize }}>{emoji}</div>
          <div style={{ display: "flex" }}>“{text}”</div>
        </section>
      
       <section 
        style={{ 
          position: "absolute",
          bottom: 10,
          right: 70,
          fontSize: 18,
          opacity: themeKey === "light" ? 0.4 : 0.6,
          letterSpacing: "0.05em",
        }}
        >
          Reketino.dev 🐻
        </section>

      </main>
    ),
    {
      width: 1200,
      height: 300,
    }
  );
}
