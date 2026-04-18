import { Mood } from "./getQuote";

export type MoodStyle = {
  glow: string;
  accent: string;
};

export const moodStyles: Record<Mood, MoodStyle> = {
  chaos: {
    glow: "",
    accent: "",
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
