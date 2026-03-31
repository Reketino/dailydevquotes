import { hash } from "./hash"

export type Mood = "chaos" | "pain" | "fun" | "wisdom";

  type Quote = string | { text: string; mood?: Mood };

  const QUOTES_URL =
  "https://raw.githubusercontent.com/Reketino/dev-quotes/master/quotes.json";

  export async function getQuote(user: string) {
    const res = await fetch (QUOTES_URL, {
        next: { revalidate: 86400 },
    })

  const rawQuotes: Quote[] = await res.json();

  const day = Math.floor(Date.now() / 86400000);
  const index = hash(`${user}-${day}`) % rawQuotes.length;

    
  }