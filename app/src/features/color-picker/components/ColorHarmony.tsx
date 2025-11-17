import { useEffect, useState } from "react";
import ColorPalleteCard from "./ColorPalleteCard";
import styles from "../styles/ColorPicker.module.css";
import {
  getAnalogousColors,
  getComplementaryColors,
  getMonochromaticColor,
  getSplitComplementaryColors,
  getTetradicColors,
  getTriadColors,
} from "../lib/colorCombinations";

import type { ColorPickerData } from "../index";
import {
  COLOR_COMBO_OPTIONS,
  type ColorCombinationTypes,
} from "../config/constants";

export interface ColorHarmonyProps {
  colorList: ColorPickerData[];
  setColorList: (newColorList: ColorPickerData[]) => void;
}

function ColorHarmony({ colorList, setColorList }: ColorHarmonyProps) {
  const [colorCombo, setColorCombo] =
    useState<ColorCombinationTypes>("complementary");
  const [showColorCodeHoverOnly, setShowColorCodeHoverOnly] =
    useState<boolean>(false);

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

  // Skeleton Loader: On first mount only primary color exists
  // so generate color harmony, based on color combination
  if (currentPrimaryColor && colorList.length === 1) {
    const newColors = deriveColorCombinations(colorCombo, currentPrimaryColor);
    colorList.push(...newColors);
    return <span className={styles.colorHarmonySkeleton} />;
  }

  return (
    <div className={styles.colorHarmonyContainer}>
      <div className={styles.colorComboContainer}>
        Color Combination
        <select
          id="color-space-choice"
          className={styles.colorComboDropdown}
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
        <label className={styles.colorCodeCheckboxLabel}>
          Always show color details
        </label>
        <input
          type="checkbox"
          checked={!showColorCodeHoverOnly}
          onChange={() => setShowColorCodeHoverOnly(!showColorCodeHoverOnly)}
          style={{ display: "inline", height: "1rem", width: "auto" }}
        />
      </div>

      <div className={styles.colorPalleteCardWrapper}>
        {colorList &&
          colorList.map((c, idx) => (
            <ColorPalleteCard
              key={`pallete-card-${idx}`}
              color={c.color}
              label={c.label}
              showTextOnHover={showColorCodeHoverOnly}
            />
          ))}
      </div>
      <p className="note-label">Tip: click a color to copy it</p>
    </div>
  );
}

export default ColorHarmony;

function deriveColorCombinations(
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
