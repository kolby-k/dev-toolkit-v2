import { rgbToHsl, rgbToOklch } from "./colorConversions";
import { p } from "../../../shared/lib/formatters";
import type { ColorSpaceType } from "../config/constants";

// Formatter
export function formatColorSpace(
  colorSpace: ColorSpaceType,
  r: number,
  g: number,
  b: number
): string {
  if (colorSpace === "rgb") return `rgb(${r}, ${g}, ${b})`;
  if (colorSpace === "hsl") {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${h} ${s}% ${l}%)`;
  }
  // oklch
  const [L, C, h] = rgbToOklch(r, g, b);
  return `oklch(${p(L, 2)} ${p(C, 2)} ${p(h, 2)})`;
}
