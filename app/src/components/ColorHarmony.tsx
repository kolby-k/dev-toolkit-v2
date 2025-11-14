import { useEffect, useState } from "react";
import ColorPalleteCard from "./ColorPalleteCard";
import type { ColorPickerData } from "../routes/tools/ColorPicker";
import styles from "../styles/ColorPicker.module.css";
import { getMonochromaticColor } from "../utils/colorCombinations";

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
      </div>

      <div className={styles.colorPalleteCardWrapper}>
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
