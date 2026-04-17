import type { CSSProperties } from "react";

export const flexColCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const textBase = {
  display: "flex",
};

export const labelText = {
  ...textBase,
  fontSize: 16,
  opacity: 0.6,
  letterSpacing: "0.08em",
};

export const newsText = {
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
