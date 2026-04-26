import type { CSSProperties } from "react";

export const flexColCenter: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const textBase: CSSProperties = {
  display: "flex",
};

export const labelText: CSSProperties = {
  ...textBase,
  fontSize: 16,
  opacity: 0.6,
  letterSpacing: "0.08em",
};

export const quoteText: CSSProperties = {
  ...textBase,
};

export const newsWrapper: CSSProperties = {
  ...flexColCenter,
  gap: 6,
  maxWidth: 800,
};

export const newsText: CSSProperties = {
  ...textBase,
  fontSize: 20,
  lineHeight: 1.5,
  overflowWrap: "break-word",
};

export const domainText: CSSProperties = {
  ...textBase,
  fontSize: 14,
  opacity: 0.5,
};

export const sectionTitle: CSSProperties = {
  display: "flex",
}
