import { ImageResponse } from "@vercel/og";
import { hash } from "@/lib/hash";
import { getDevNews } from "@/lib/getDevNews";
import { getQuote } from "@/lib/getQuote";
import { truncate } from "@/lib/truncate";
import { resolveTheme } from "@/lib/theme";


export const runtime = "edge";

const emojis = ["☠️", "🔥", "🧠", "🥴", "🤡", "🚀", "🃏", "🪖"];


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") ?? "guest";
  const theme = searchParams.get("theme") ?? "dark";

  const [{ text, mood }, news] = await promise.all([
    getQuote(user),
    getDevNews(user),
  ])

  type Quote = string | { text: string; mood?: Mood };

  const rawQuotes: Quote[] = await res.json();

  const day = Math.floor(Date.now() / 86400000);
  const index = hash(`${user}-${day}`) % rawQuotes.length;

  const raw = rawQuotes[index];

  const text: string =
    typeof raw === "string"
      ? raw
      : typeof raw?.text === "string"
        ? raw.text
        : "Code is hard. Life is harder.";

  const mood: Mood = typeof raw === "object" && raw?.mood ? raw.mood : "chaos";

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

  const grainByMood: Record<Mood, { opacity: number }> = {
    chaos: { opacity: 0.006 },
    pain: { opacity: 0.04 },
    fun: { opacity: 0.05 },
    wisdom: { opacity: 0.025 },
  };

  const grain = grainByMood[mood];

  return new ImageResponse(
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
    </main>,
    {
      width: 1200,
      height: 300,
    },
  );
}
