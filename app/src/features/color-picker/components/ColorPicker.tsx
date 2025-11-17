import { useState } from "react";
import ColorHarmony from "./ColorHarmony";
import ColorPickerSelector from "./ColorPickerSelector";
import styles from "../styles/ColorPicker.module.css";
import type { ColorPickerData } from "../index";

function ColorPicker() {
  const [data, setData] = useState<ColorPickerData[]>([]);

  const handleNewPrimary = (newColor: string) => {
    const currentPrimary = data.find((c) => c.label === "Primary");
    if (newColor === currentPrimary?.color) return;

    const newData = [{ color: newColor, label: "Primary" }];

    setData(newData);
  };

  return (
    <div className={styles.page}>
      <h4 className={styles.title}>Color Picker</h4>
      <p className={styles.description}>
        Select a primary color, modify the color space, and easily visualize a
        color pallete using different combinations.
      </p>
      <div className={styles.trow}>
        <div className={styles.trow1}>
          <ColorPickerSelector setColor={handleNewPrimary} />
        </div>
        <div className={styles.trow2}>
          <ColorHarmony colorList={data} setColorList={setData} />
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
