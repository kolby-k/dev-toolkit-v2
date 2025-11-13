import { useEffect, useState } from "react";
import ColorPalleteCard from "./ColorPalleteCard";
import type { ColorPickerData } from "../routes/tools/ColorPicker";

export interface ColorHarmonyProps {
  colorList: ColorPickerData[];
  setColorList: (newColorList: ColorPickerData[]) => void;
}

export type ColorCombinationTypes =
  | "complementary"
  | "analogous"
  | "monochromatic"
  | "triad"
  | "split-complementary"
  | "tetradic";

const COLOR_COMBO_OPTIONS: ColorCombinationTypes[] = [
  "complementary",
  "analogous",
  "monochromatic",
  "triad",
  "split-complementary",
  "tetradic",
];

function ColorHarmony({ colorList, setColorList }: ColorHarmonyProps) {
  const [colorCombo, setColorCombo] =
    useState<ColorCombinationTypes>("complementary");
  const currentPrimaryData = colorList.find((c) => c.label === "Primary");
  const currentPrimaryColor = currentPrimaryData?.color;

  useEffect(() => {
    if (currentPrimaryColor) {
      const newColors = deriveColorCombinations(
        colorCombo,
        currentPrimaryColor
      );

      setColorList([
        { color: currentPrimaryColor, label: "Primary" },
        ...newColors,
      ]);
    }
  }, [colorCombo, currentPrimaryColor, setColorList]);

  if (currentPrimaryColor && colorList.length === 1) {
    const newColors = deriveColorCombinations(colorCombo, currentPrimaryColor);
    colorList.push(...newColors);
    return (
      <span
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          minWidth: "100%",
          background: "var(--bg-secondary)",
          inset: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "1.25rem",
          fontWeight: 500,
          margin: "1rem",
        }}
      >
        Color Combination
        <select
          id="color-space-choice"
          style={{
            width: 200,
            backgroundColor: "var(--input)",
            color: "var(--text)",
            padding: "6px",
            border: "1px solid var(--border)",
            borderRadius: 4,
            fontSize: "1.05rem",
            margin: 4,
          }}
          value={colorCombo ?? ""}
          onChange={(e) =>
            setColorCombo(e.target.value as ColorCombinationTypes)
          }
        >
          {COLOR_COMBO_OPTIONS.map((c) => (
            <option key={`option-${c}`} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontSize: "1.25rem",
          fontWeight: 500,
          margin: "1rem",
        }}
      >
        {colorList &&
          colorList.map((c, idx) => (
            <ColorPalleteCard
              key={`pallete-card-${idx}`}
              color={c.color}
              label={c.label}
            />
          ))}
      </div>
    </div>
  );
}

export default ColorHarmony;

function deriveColorCombinations(
  colorCombination: ColorCombinationTypes,
  primaryColor: string
) {
  const colorList: ColorPickerData[] = [];

  let secondary;
  let tertiary;
  let quaternary;

  if (colorCombination === "complementary") {
    secondary = { color: "rgba(52, 27, 153, 1)", label: "Secondary" };
    colorList.push(secondary);
  }

  if (colorCombination === "split-complementary") {
    secondary = { color: "oklch(0.7039 0.1 245.1896)", label: "Secondary" };
    colorList.push(secondary);
  }

  if (colorCombination === "analogous") {
    secondary = { color: "rgba(153, 27, 27, 1)", label: "Secondary" };
    colorList.push(secondary);
  }

  if (colorCombination === "monochromatic") {
    const newSecondary = getMonochromaticColor(primaryColor);
    if (newSecondary) colorList.push(newSecondary);
  }

  if (colorCombination === "triad") {
    secondary = { color: "rgba(177, 26, 26, 1)", label: "Secondary" };
    tertiary = { color: "rgba(76, 104, 159, 1)", label: "Tertiary" };
    colorList.push(secondary);
    colorList.push(tertiary);
  }

  if (colorCombination === "tetradic") {
    secondary = { color: "rgba(177, 26, 26, 1)", label: "Secondary" };
    tertiary = { color: "rgba(76, 104, 159, 1)", label: "Tertiary" };
    quaternary = { color: "rgba(105, 159, 76, 1)", label: "Quaternary" };
    colorList.push(secondary);
    colorList.push(tertiary);
    colorList.push(quaternary);
  }

  return colorList;
}

// Monochormatic colors share the same hue, but vary in lightness; with subtle shifts in chroma/saturation.
function getMonochromaticColor(primaryColor: string): ColorPickerData | null {
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

function clamp255(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

const p = (x: number, d = 4) => Number(x.toFixed(d));
