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

export const newsText: CSSProperties = {
  ...textBase,
  fontSize: 20,
  lineheight: 1.5,
  wordWrap: "break-word",
};

export const domainText = {
  ...textBase,
  fontSize: 14,
  opacity: 0.5,
};
