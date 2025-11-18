import { useCallback, useEffect, useState } from "react";
import ColorHarmony from "./ColorHarmony";
import ColorPickerSelector from "./ColorPickerSelector";
import styles from "../styles/ColorPicker.module.css";
import type { ColorPickerData } from "../index";
import ColorPickerDropdowns from "./ColorPickerDropdowns";
import type {
  ColorCombinationTypes,
  ColorSpaceType,
} from "../config/constants";
import deriveColorCombinations from "../lib/colorCombinations";
import { formatColorSpace } from "../lib/formatter";

const INITAL_COLOR = "hsl(100 50% 50%)";

function ColorPicker() {
  const [currentColorSpace, setCurrentColorSpace] =
    useState<ColorSpaceType>("hsl");
  const [currentColorCombo, setCurrentColorCombo] =
    useState<ColorCombinationTypes>("complementary");

  const [primary, setPrimary] = useState<ColorPickerData>({
    color: INITAL_COLOR,
    label: "Primary",
  });
  const [combinationColors, setCombinationColors] = useState<ColorPickerData[]>(
    []
  );

  const handleNewPrimary = (rgbValues: [number, number, number]) => {
    const newColor = formatColorSpace(currentColorSpace, ...rgbValues);
    if (newColor === primary?.color) return;
    setPrimary({ color: newColor, label: "Primary" });
    // generate new color harmony data when primary changes
    const newPallete = deriveColorCombinations(currentColorCombo, newColor);
    setCombinationColors(newPallete);
  };

  const getNewColorList = useCallback(() => {
    return deriveColorCombinations(currentColorCombo, primary.color);
  }, [primary.color, currentColorCombo]);

  // generate new color harmony data when color combination changes
  useEffect(() => {
    const newPallete = getNewColorList();
    setCombinationColors(newPallete);
  }, [currentColorCombo, getNewColorList]);

  return (
    <div className={styles.colorPickerWrapper}>
      <ColorPickerDropdowns
        colorSpace={currentColorSpace}
        colorCombo={currentColorCombo}
        setColorSpace={setCurrentColorSpace}
        setColorCombo={setCurrentColorCombo}
      />
      <div className={styles.colorPickerContent}>
        <ColorPickerSelector
          colorSpace={currentColorSpace}
          setColor={handleNewPrimary}
        />
        <ColorHarmony primaryColor={primary} colorList={combinationColors} />
      </div>
    </div>
  );
}

export default ColorPicker;
