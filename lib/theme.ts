export const themes = {
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

export function resolveTheme(theme: string) {
  const key =
    theme === "tokyo-night" || theme === "tokyo" ? "tokyonight" : theme;

  return themes[key as keyof typeof themes] ?? themes.dark;
}
