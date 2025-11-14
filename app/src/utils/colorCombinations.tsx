import type { ColorPickerData } from "../routes/tools/ColorPicker";
import { clamp255 } from "./clamp";
import { p } from "./formatters";

// Monochormatic colors share the same hue, but vary in lightness; with subtle shifts in chroma/saturation.
export function getMonochromaticColor(
  primaryColor: string
): ColorPickerData | null {
  const isRGB = primaryColor.startsWith("rgb");
  const isOKLCH = primaryColor.startsWith("oklch");
  const isHSL = primaryColor.startsWith("hsl");

  let secondary = null;

  // shift all rgb values by a similiar scalar; adjust more if near extremes.
  if (isRGB) {
    const rgb = primaryColor.match(/(\d+){1,3}/g);
    if (!rgb) return null;

    const minVal = rgb.reduce(
      (acc, cur) => (parseInt(cur) <= acc ? parseInt(cur) : acc),
      parseInt(rgb[0])
    );
    const maxVal = rgb.reduce(
      (acc, cur) => (parseInt(cur) >= acc ? parseInt(cur) : acc),
      parseInt(rgb[0])
    );
    const isNearExtremes = maxVal > 200 || minVal < 50;

    console.log("near extremes? ", isNearExtremes, rgb);

    const lightnessScaleFactor = isNearExtremes ? 0.5 : 0.7;
    const [r, g, b] = rgb.map((v) => {
      const currentVal = parseInt(v);
      const newVal = currentVal * lightnessScaleFactor;
      return Math.round(clamp255(newVal));
    });

    const newColor = `rgb(${r},${g},${b})`;

    secondary = { color: newColor, label: "Secondary" };
  }

  // example input: hsl(260 57% 43%)
  // example output: ["51","215","212"]
  if (isHSL) {
    const hsl = primaryColor.match(/(\d+){1,3}/g);
    if (!hsl) return null;

    const [h, s, l] = hsl.map((v, idx) => {
      const currentVal = parseInt(v);
      let newVal;
      // adjust hue
      if (idx === 0) {
        newVal = currentVal;
        //newVal = currentVal >= 180 ? currentVal - 60 : currentVal + 60;
      }

      // adjust saturation
      if (idx === 1) {
        newVal = currentVal;
      }

      // adjust lightness
      if (idx === 2) {
        newVal = p(Math.min(100, Math.max(0, currentVal * 0.7)), 0);
      }
      return newVal;
    });

    const newColor = `hsl(${h} ${s}% ${l}%)`;

    secondary = { color: newColor, label: "Secondary" };
  }

  // adjust oklch lightness by 10%; chroma by 0.05; hue reamins constant
  if (isOKLCH) {
    const lch = primaryColor.match(/(\d+.\d+){1,3}/g);
    if (!lch) return null;

    const [l, c, h] = lch.map((v, idx) => {
      const currentVal = parseFloat(v);
      let newVal = currentVal;
      // adjust lightness; main variable to change in monochormatic
      if (idx === 0) {
        newVal = currentVal > 0.5 ? currentVal - 0.1 : currentVal + 0.1;
      }
      // adjust chroma gently; avoid extreme saturations
      if (idx === 1) {
        newVal = currentVal > 0.25 ? currentVal - 0.05 : currentVal + 0.05;
      }
      // adjust hue; not required for monochoromatic
      if (idx === 2) {
        newVal = currentVal;
      }
      return parseFloat(newVal.toFixed(2));
    });
    secondary = { color: `oklch(${l} ${c} ${h})`, label: "Secondary" };
  }

  return secondary;
}
