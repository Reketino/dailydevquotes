import { Mood } from "./getQuote";

export type MoodStyle = {
  glow: string;
  accent: string;
};

export const moodStyles: Record<Mood, MoodStyle> = {
  chaos: {
    glow: "0 0 40px rgba(255, 50, 50, 0.6)",
    accent: "#ff4d4d",
  },
  pain: {
    glow: "",
    accent: "",
  },
  fun: {
    glow: "",
    accent: "",
  },
  wisdom: {
    glow: "",
    accent: "",
  },
};
