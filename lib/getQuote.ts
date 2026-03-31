import { hash } from "./hash"

export type Mood = "chaos" | "pain" | "fun" | "wisdom";

  type Quote = string | { text: string; mood?: Mood };

  const QUOTES_URL =
  "https://raw.githubusercontent.com/Reketino/dev-quotes/master/quotes.json";

  export async function getQuote(user: string) {
    const res = await fetch (QUOTES_URL, {
        next: { revalidate: 86400 },
    })
    
  }