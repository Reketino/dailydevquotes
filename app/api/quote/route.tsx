import { ImageResponse } from "@vercel/og";

export const runtime = "edge";


const emojis = ["☠️", "🔥", "🧠", "🥴", "🤡", "🚀", "🃏", "🪖"]

const QUOTES_URL =
  "https://raw.githubusercontent.com/Reketino/dev-quotes/master/quotes.json";


  function hash(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h|= 0;
    }
    return Math.abs(h);
  }


  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user") ?? "guest";
    

    const res = await fetch(QUOTES_URL, {
        next: { revalidate: 86400 }
    });


    const quotes: string[] = await res.json();

    const day = Math.floor(Date.now() / 86400000 );
    const index = hash (`${user}-${day}`) % quotes.length;
    const quote = quotes[index];
    const emojiIndex = hash(`emoji-${user}-${day}`) % emojis.length;
    const emoji = emojis[emojiIndex]


    return new ImageResponse(
        (
            <main
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #020617, #0f172a)",
                color: "#e5e7eb",
                padding: 60,
                textAlign: "center",
                fontSize: 32,
                fontFamily: "Inter",
            }}
            >
             <section
             style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
             }}
             >   
            <div style={{ fontSize: 56 }}>{emoji}</div>
            <header>"{quote}"</header>
            </section>
            </main>
        ),
        {
            width: 1200,
            height: 300,
        }
    );
  }