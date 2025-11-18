import { clamp100, clamp100p, clamp255 } from "../../../shared/lib/clamp";
import { hslToRgb, rgbToHsl } from "./colorConversions";
import { p } from "../../../shared/lib/formatters";
import { wrap360 } from "../../../shared/lib/wrap";

import type {
  ColorCombinationTypes,
  ColorSpaceType,
} from "../config/constants";
import type { ColorPickerData, ColorSpaceData } from "../index";

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
): ColorPickerData[] | null {
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
    const [h, s, l] = values;
    const newL = p(clamp100(l * 0.7), 0);

    secondary = { color: `hsl(${h} ${s}% ${newL}%)`, label: "Secondary" };
  }

  // adjust oklch lightness by 10%; chroma and hue reamins constant
  if (colorSpace === "oklch") {
    const [l, c, h] = values;
    const newL = l >= 0.15 ? clamp100p(l - 0.15) : 0.2;
    secondary = { color: `oklch(${p(newL, 2)} ${c} ${h})`, label: "Secondary" };
  }

  return [secondary as ColorPickerData];
}

// return a set of 2 colors that are different hues, but close together on the color wheel
export function getAnalogousColors(
  primaryColor: string
): ColorPickerData[] | null {
  const { colorSpace, values } = getColorSpaceType(primaryColor);

  let tint; // lighter
  let shade; // darker

  // convert to HSL for shifting hue
  if (colorSpace === "rgb") {
    const [r, g, b] = values;
    const [h, s, l] = rgbToHsl(r, g, b);

    const scaleValue = 20;
    const hPlus = wrap360(h + scaleValue);
    const hMinus = wrap360(h - scaleValue);

    const [tr, tg, tb] = hslToRgb(hPlus, s, l);
    const [sr, sg, sb] = hslToRgb(hMinus, s, l);

    tint = {
      color: `rgb(${tr},${tg},${tb})`,
      label: "Secondary",
    } as ColorPickerData;

    shade = {
      color: `rgb(${sr},${sg},${sb})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  // adjust hue, keep s and l similiar
  if (colorSpace === "hsl") {
    const scaleValue = 20;
    const [h, s, l] = values;
    const th = wrap360(h + scaleValue);
    const sh = wrap360(h - scaleValue);

    tint = {
      color: `hsl(${th} ${s}% ${l}%)`,
      label: "Secondary",
    } as ColorPickerData;
    shade = {
      color: `hsl(${sh} ${s}% ${l}%)`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (colorSpace === "oklch") {
    const scaleValue = 30;
    const [l, c, h] = values;
    const th = p(wrap360(h + scaleValue), 2);
    const sh = p(wrap360(h - scaleValue), 2);
    tint = {
      color: `oklch(${l} ${c} ${th})`,
      label: "Secondary",
    } as ColorPickerData;
    shade = {
      color: `oklch(${l} ${c} ${sh})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (!tint || !shade) return null;

  return [tint, shade];
}

// return a 1 color that is on the opposite side of the color wheel.
export function getComplementaryColors(
  primaryColor: string
): ColorPickerData[] | null {
  const { colorSpace, values } = getColorSpaceType(primaryColor);

  let opposite; // complementary color

  // convert to HSL for shifting hue
  if (colorSpace === "rgb") {
    const [h, s, l] = rgbToHsl(...values);

    const scaleValue = 180;
    const hPlus = wrap360(h + scaleValue);

    const [r, g, b] = hslToRgb(hPlus, s, l);

    opposite = {
      color: `rgb(${r},${g},${b})`,
      label: "Secondary",
    } as ColorPickerData;
  }

  // adjust hue by 180 degrees
  if (colorSpace === "hsl") {
    const scaleValue = 180;
    const [h, s, l] = values;
    const newHue = wrap360(h + scaleValue);

    opposite = {
      color: `hsl(${newHue} ${s}% ${l}%)`,
      label: "Secondary",
    } as ColorPickerData;
  }

  if (colorSpace === "oklch") {
    const scaleValue = 180;
    const [l, c, h] = values;
    const newHue = p(wrap360(h + scaleValue), 2);

    opposite = {
      color: `oklch(${l} ${c} ${newHue})`,
      label: "Secondary",
    } as ColorPickerData;
  }

  if (!opposite) return null;

  return [opposite];
}

// return a set of 2 colors that are adjecent to the primary color.
export function getTriadColors(primaryColor: string): ColorPickerData[] | null {
  const { colorSpace, values } = getColorSpaceType(primaryColor);

  let secondary;
  let tertiary;

  // convert to HSL for shifting hue
  if (colorSpace === "rgb") {
    const [h, s, l] = rgbToHsl(...values);

    const scaleValue = 120;
    const hPlus = wrap360(h + scaleValue);
    const hLow = wrap360(h - scaleValue);
    const [r1, g1, b1] = hslToRgb(hPlus, s, l);
    const [r2, g2, b2] = hslToRgb(hLow, s, l);

    secondary = {
      color: `rgb(${r1},${g1},${b1})`,
      label: "Secondary",
    } as ColorPickerData;
    tertiary = {
      color: `rgb(${r2},${g2},${b2})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  // adjust hue by 180 degrees
  if (colorSpace === "hsl") {
    const scaleValue = 120;
    const [h, s, l] = values;
    const h1 = wrap360(h + scaleValue);
    const h2 = wrap360(h - scaleValue);

    secondary = {
      color: `hsl(${h1} ${s}% ${l}%)`,
      label: "Secondary",
    } as ColorPickerData;
    tertiary = {
      color: `hsl(${h2} ${s}% ${l}%)`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (colorSpace === "oklch") {
    const scaleValue = 120;
    const [l, c, h] = values;
    const h1 = p(wrap360(h + scaleValue), 2);
    const h2 = p(wrap360(h - scaleValue), 2);

    secondary = {
      color: `oklch(${l} ${c} ${h1})`,
      label: "Secondary",
    } as ColorPickerData;
    tertiary = {
      color: `oklch(${l} ${c} ${h2})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (!secondary || !tertiary) return null;

  return [secondary, tertiary];
}

// return 2 colors that are on the opposite side of the color wheel, but slightly shifted from true complementary.
export function getSplitComplementaryColors(
  primaryColor: string
): ColorPickerData[] | null {
  const { colorSpace, values } = getColorSpaceType(primaryColor);

  let secondary;
  let tertiary;

  // convert to HSL for shifting hue
  if (colorSpace === "rgb") {
    const [h, s, l] = rgbToHsl(...values);

    const scaleValue1 = 150;
    const scaleValue2 = 210;
    const h1 = wrap360(h + scaleValue1);
    const h2 = wrap360(h + scaleValue2);

    const [r1, g1, b1] = hslToRgb(h1, s, l);
    const [r2, g2, b2] = hslToRgb(h2, s, l);

    secondary = {
      color: `rgb(${r1},${g1},${b1})`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `rgb(${r2},${g2},${b2})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  // adjust hue by 180 degrees
  if (colorSpace === "hsl") {
    const scaleValue1 = 150;
    const scaleValue2 = 210;
    const [h, s, l] = values;
    const h1 = wrap360(h + scaleValue1);
    const h2 = wrap360(h + scaleValue2);

    secondary = {
      color: `hsl(${h1} ${s}% ${l}%)`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `hsl(${h2} ${s}% ${l}%)`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (colorSpace === "oklch") {
    const scaleValue1 = 150;
    const scaleValue2 = 210;
    const [l, c, h] = values;
    const h1 = p(wrap360(h + scaleValue1), 2);
    const h2 = p(wrap360(h + scaleValue2), 2);

    secondary = {
      color: `oklch(${l} ${c} ${h1})`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `oklch(${l} ${c} ${h2})`,
      label: "Tertiary",
    } as ColorPickerData;
  }

  if (!secondary || !tertiary) return null;

  return [secondary, tertiary];
}

// return 3 colors that form two complementary pairs on the color wheel, based on primary color.
export function getTetradicColors(
  primaryColor: string
): ColorPickerData[] | null {
  const { colorSpace, values } = getColorSpaceType(primaryColor);

  let secondary;
  let tertiary;
  let quaternary;

  // convert to HSL for shifting hue
  if (colorSpace === "rgb") {
    const [h, s, l] = rgbToHsl(...values);

    const scaleValue = 90;
    const h1 = wrap360(h + scaleValue);
    const h2 = wrap360(h + scaleValue * 2);
    const h3 = wrap360(h + scaleValue * 3);

    const [r1, g1, b1] = hslToRgb(h1, s, l);
    const [r2, g2, b2] = hslToRgb(h2, s, l);
    const [r3, g3, b3] = hslToRgb(h3, s, l);

    secondary = {
      color: `rgb(${r1},${g1},${b1})`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `rgb(${r2},${g2},${b2})`,
      label: "Tertiary",
    } as ColorPickerData;
    quaternary = {
      color: `rgb(${r3},${g3},${b3})`,
      label: "Quaternary",
    } as ColorPickerData;
  }

  // adjust hue by 180 degrees
  if (colorSpace === "hsl") {
    const scaleValue = 90;

    const [h, s, l] = values;
    const h1 = wrap360(h + scaleValue);
    const h2 = wrap360(h + scaleValue * 2);
    const h3 = wrap360(h + scaleValue * 3);

    secondary = {
      color: `hsl(${h1} ${s}% ${l}%)`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `hsl(${h2} ${s}% ${l}%)`,
      label: "Tertiary",
    } as ColorPickerData;

    quaternary = {
      color: `hsl(${h3} ${s}% ${l}%)`,
      label: "Quaternary",
    } as ColorPickerData;
  }

  if (colorSpace === "oklch") {
    const scaleValue = 90;

    const [l, c, h] = values;
    const h1 = p(wrap360(h + scaleValue), 2);
    const h2 = p(wrap360(h + scaleValue * 2), 2);
    const h3 = p(wrap360(h + scaleValue * 3), 2);

    secondary = {
      color: `oklch(${l} ${c} ${h1})`,
      label: "Secondary",
    } as ColorPickerData;

    tertiary = {
      color: `oklch(${l} ${c} ${h2})`,
      label: "Tertiary",
    } as ColorPickerData;

    quaternary = {
      color: `oklch(${l} ${c} ${h3})`,
      label: "Quaternary",
    } as ColorPickerData;
  }

  if (!secondary || !tertiary || !quaternary) return null;

  return [secondary, tertiary, quaternary];
}

export default function deriveColorCombinations(
  colorCombination: ColorCombinationTypes,
  primaryColor: string
) {
  const colorList: ColorPickerData[] = [];

  // 1 secondary color, opposite of primary, creating strong contrast.
  if (colorCombination === "complementary") {
    const newSecondary = getComplementaryColors(primaryColor);
    if (newSecondary) colorList.push(...newSecondary);
  }

  if (colorCombination === "split-complementary") {
    const newColors = getSplitComplementaryColors(primaryColor);
    if (newColors) colorList.push(...newColors);
  }

  // A set of colors that are different hues, but close together on the color wheel
  if (colorCombination === "analogous") {
    const newColors = getAnalogousColors(primaryColor);
    if (newColors) colorList.push(...newColors);
  }

  // One hue, with changes only in lightness and chroma/saturation.
  if (colorCombination === "monochromatic") {
    const newSecondary = getMonochromaticColor(primaryColor);
    if (newSecondary) colorList.push(...newSecondary);
  }

  if (colorCombination === "triad") {
    const newColors = getTriadColors(primaryColor);
    if (newColors) colorList.push(...newColors);
  }

  if (colorCombination === "tetradic") {
    const newColors = getTetradicColors(primaryColor);
    if (newColors) colorList.push(...newColors);
  }

  return colorList;
}
