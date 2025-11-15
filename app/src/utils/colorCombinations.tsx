import type { ColorSpaceType } from "../components/ColorPickerSelector";
import type { ColorPickerData } from "../routes/tools/ColorPicker";
import { clamp100p, clamp255 } from "./clamp";
import { p } from "./formatters";

export type ColorSpaceData = {
  colorSpace: ColorSpaceType;
  values: [number, number, number]; // represent rgb | hsl | oklch
  min: number;
  max: number;
};

/* UTILS */
const getColorSpaceType = (primaryColor: string): ColorSpaceData => {
  if (!primaryColor)
    throw new Error("Missing required parameter: primary color (string)");

  const colorSpace = primaryColor.match(/([a-z]{3,5})/g);
  if (!colorSpace)
    throw new Error("Unexpected primary color: expected rgb | hsl | oklch");

  const colorValues = primaryColor
    .match(/-?\d*\.?\d+/g)
    ?.map((v) => p(Number(v), 4));

  if (!colorValues || colorValues.length !== 3)
    throw new Error(
      `Failed to find color values for primary color (${primaryColor})`
    );

  const minVal = colorValues.reduce(
    (acc, cur) => (cur <= acc ? cur : acc),
    colorValues[0]
  );
  const maxVal = colorValues.reduce(
    (acc, cur) => (cur >= acc ? cur : acc),
    colorValues[0]
  );

  const colorData = {
    colorSpace: colorSpace[0] as ColorSpaceType,
    values: colorValues,
    min: minVal,
    max: maxVal,
  };

  return colorData as ColorSpaceData;
};

/* MAIN LOGIC */
// MONOCHROMATIC
// - Monochormatic colors share the same hue, but vary in lightness; with subtle shifts in chroma/saturation.
export function getMonochromaticColor(
  primaryColor: string
): ColorPickerData | null {
  const { colorSpace, values, min, max } = getColorSpaceType(primaryColor);

  let secondary = null;

  // shift all rgb values by a similiar scalar; adjust more if near extremes.
  if (colorSpace === "rgb") {
    // RGB scaling will appear different near extreme values so adjust scale factor
    const isNearExtremes = max > 200 || min < 50;
    const lightnessScaleFactor = isNearExtremes ? 0.5 : 0.7;
    const [r, g, b] = values.map((v) => {
      const newVal = v * lightnessScaleFactor;
      return Math.round(clamp255(newVal));
    });

    secondary = { color: `rgb(${r},${g},${b})`, label: "Secondary" };
  }

  // example input: hsl(260 57% 43%)
  // example output: ["51","215","212"]
  if (colorSpace === "hsl") {
    const [h, s, l] = values.map((v, idx) => {
      let newVal;
      // adjust hue
      if (idx === 0) {
        newVal = v;
        //newVal = currentVal >= 180 ? currentVal - 60 : currentVal + 60;
      }

      // adjust saturation
      if (idx === 1) {
        newVal = v;
      }

      // adjust lightness
      if (idx === 2) {
        newVal = p(Math.min(100, Math.max(0, v * 0.7)), 0);
      }
      return newVal;
    });

    secondary = { color: `hsl(${h} ${s}% ${l}%)`, label: "Secondary" };
  }

  // adjust oklch lightness by 10%; chroma and hue reamins constant
  if (colorSpace === "oklch") {
    const [l, c, h] = values.map((v, idx) => {
      const currentVal = v;
      let newVal = currentVal;
      // adjust lightness; main variable to change in monochormatic
      if (idx === 0) {
        newVal = currentVal >= 0.15 ? clamp100p(currentVal - 0.15) : 0.2;
      }
      // adjust chroma; no required for monochromatic
      if (idx === 1) {
        newVal = currentVal;
      }
      // adjust hue; not required for monochoromatic
      if (idx === 2) {
        newVal = currentVal;
      }
      return p(newVal, 2);
    });
    secondary = { color: `oklch(${l} ${c} ${h})`, label: "Secondary" };
  }

  return secondary;
}

// NEW - TODO
// return a set of 2 colors that are different hues, but close together on the color wheel
export function getAnalogousColors(primaryColor: string) {
  return primaryColor;
}
