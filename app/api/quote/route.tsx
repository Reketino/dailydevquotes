import { ImageResponse } from "@vercel/og";
import { hash } from "@/lib/hash";
import { getDevNews } from "@/lib/getDevNews";
import { getQuote } from "@/lib/getQuote";
import { safeText } from "@/lib/safeText";
import { resolveTheme } from "@/lib/theme";
import { getDomain } from "@/lib/getDomain";
import type { Mood } from "@/lib/getQuote";
import { moodStyles } from "@/lib/moodStyles";
import {
  flexColCenter,
  textBase,
  newsText,
  domainText,
  newsWrapper,
  quoteText,
  sectionTitle,
} from "@/lib/ogStyles";

export const runtime = "edge";
export const revalidate = 3600;

const emojis = ["☠️", "🔥", "🧠", "🥴", "🤡", "🚀", "🃏", "🪖"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") ?? "guest";
  const theme = searchParams.get("theme") ?? "dark";

  const quote = await getQuote(user);
  const news = await getDevNews();

  const text = quote?.text ?? "Fallback quote";
  const quoteLength = text.length;
  const dynamicGap =
    quoteLength < 80
      ? 26
      : quoteLength < 120
        ? 22
        : quoteLength < 180
          ? 24
          : 14;
  const quoteSize =
    quoteLength < 80
      ? 28
      : quoteLength < 120
        ? 26
        : quoteLength < 180
          ? 24
          : 22;

  const mood = quote?.mood ?? "chaos";
  const shortNews = safeText(news.title, 90);
  const domain = getDomain(news.link)?.replace(".com", "");

  const day = Math.floor(Date.now() / 86400000);
  const emojiIndex = hash(`emoji-${user}-${day}`) % emojis.length;
  const emoji = emojis[emojiIndex];

  const activeTheme = resolveTheme(theme);
  const emojiSize = theme === "light" ? 44 : theme?.includes("tokyo") ? 60 : 56;
  const finalEmojiSize =
    quoteLength > 140
      ? emojiSize - 16
      : quoteLength > 100
        ? emojiSize - 10
        : emojiSize;

  const grainByMood: Record<Mood, { opacity: number }> = {
    chaos: { opacity: 0.006 },
    pain: { opacity: 0.04 },
    fun: { opacity: 0.05 },
    wisdom: { opacity: 0.025 },
  };

  const grain = grainByMood[mood];

  const { glow, accent } = moodStyles[mood];

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
        padding: "20px 60px 30px 60px",
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
          justifyContent: "flex-start",
          alignItems: "center",
          gap: dynamicGap,

          width: 740,
          maxWidth: 780,
          boxSizing: "border-box",

          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 28,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          padding: "20px 48px",
          minHeight: 160,
        }}
      >
        <div style={{ ...flexColCenter, gap: 10 }}>
          <div
            style={{
              ...textBase,
              fontSize: finalEmojiSize,
              marginTop: 4,
            }}
          >
            {emoji}
          </div>
          <div
            style={{
              ...sectionTitle,
              color: accent,
            }}
          >
            Dev Quotes
          </div>
          <div
            style={{
              ...quoteText,
              textShadow: glow,
              fontSize: quoteSize,
              lineHeight: 1.3,
              width: "100%",
              maxWidth: 680,
              marginBottom: 4,
            }}
          >
            {text}
          </div>
        </div>

        <div style={{ ...flexColCenter, gap: 8, marginTop: 4 }}>
          <div
            style={{
              ...sectionTitle,
              color: accent,
            }}
          >
            Dev News
          </div>
          <div style={newsWrapper}>
            <div
              style={{
                ...newsText,
                width: "100%",
                maxWidth: 620,
                fontSize: 18,
                opacity: 0.9,
              }}
            >
              {shortNews}
            </div>
            {domain && <div style={domainText}>🌐 {domain}</div>}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "absolute",
          bottom: 20,
          right: 24,
          fontSize: 15,
          opacity: 0.45,
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
