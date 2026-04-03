import { ImageResponse } from "@vercel/og";
import { hash } from "@/lib/hash";
import { getDevNews } from "@/lib/getDevNews";
import { getQuote } from "@/lib/getQuote";
import { safeText } from "@/lib/safeText";
import { resolveTheme } from "@/lib/theme";
import type { Mood } from "@/lib/getQuote";

export const runtime = "edge";

const emojis = ["☠️", "🔥", "🧠", "🥴", "🤡", "🚀", "🃏", "🪖"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") ?? "guest";
  const theme = searchParams.get("theme") ?? "dark";

  const quote = await getQuote(user);
  const newsRaw = await getDevNews(user);

  const text = quote?.text ?? "Fallback quote";
  const mood = quote?.mood ?? "chaos"
  const shortNews = safeText(newsRaw, 90);

  const day = Math.floor(Date.now() / 86400000);
  const emojiIndex = hash(`emoji-${user}-${day}`) % emojis.length;
  const emoji = emojis[emojiIndex]

  const activeTheme = resolveTheme(theme);
  const emojiSize = theme === "light" ? 48 : theme?.includes("tokyo") ? 60 : 56;

  const grainByMood: Record<Mood, { opacity: number }> = {
    chaos: { opacity: 0.006 },
    pain: { opacity: 0.04 },
    fun: { opacity: 0.05 },
    wisdom: { opacity: 0.025 },
  };

  const grain = grainByMood[mood];

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
      ></section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontSize: emojiSize }}>{emoji}</div>
        <div>{text}</div>

        <div
          style={{
            fontSize: 20,
            opacity: 0.7,
            maxWidth: 900,
          }}
        >
          <span>NEWS</span> 
          <span>{shortNews}</span>
        </div>
      </section>

      <section
        style={{
          position: "absolute",
          bottom: 10,
          right: 70,
          fontSize: 18,
          opacity: theme === "light" ? 0.4 : 0.6,
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
    },
  );
}
