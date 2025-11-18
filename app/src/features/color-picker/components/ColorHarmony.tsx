import { useState } from "react";

import ColorPalleteCard from "./ColorPalleteCard";
import type { ColorPickerData } from "../index";

import styles from "../styles/ColorPicker.module.css";

export interface ColorHarmonyProps {
  primaryColor: ColorPickerData;
  colorList: ColorPickerData[];
}

function ColorHarmony({ primaryColor, colorList }: ColorHarmonyProps) {
  const [showColorCodeHoverOnly, setShowColorCodeHoverOnly] =
    useState<boolean>(false);

  return (
    <div className={styles.colorHarmonyContainer}>
      <div className={styles.colorPalleteCardWrapper}>
        <ColorPalleteCard
          color={primaryColor.color}
          label={primaryColor.label}
          showTextOnHover={showColorCodeHoverOnly}
        />
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
      <div className={styles.flexColContainer}>
        <label className={styles.colorCodeCheckboxLabel}>
          Always show color details
        </label>
        <input
          type="checkbox"
          checked={!showColorCodeHoverOnly}
          onChange={() => setShowColorCodeHoverOnly(!showColorCodeHoverOnly)}
          className={styles.checkbox}
        />
        <p className="note-label">Tip: click a color to copy it</p>
      </div>
    </div>
  );
}

export default ColorHarmony;
