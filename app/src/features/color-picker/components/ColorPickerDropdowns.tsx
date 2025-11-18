import styles from "../styles/ColorPicker.module.css";
import type {
  ColorCombinationTypes,
  ColorSpaceType,
} from "../config/constants";
import { COLOR_SPACE_OPTIONS, COLOR_COMBO_OPTIONS } from "../config/constants";

export interface ColorPickerDropdownsProps {
  colorSpace: ColorSpaceType;
  colorCombo: ColorCombinationTypes;
  setColorSpace: (newColorSpace: ColorSpaceType) => void;
  setColorCombo: (newColorCombo: ColorCombinationTypes) => void;
}

function ColorPickerDropdowns({
  colorSpace,
  colorCombo,
  setColorSpace,
  setColorCombo,
}: ColorPickerDropdownsProps) {
  return (
    <div className={styles.dropdownButtonsWrapper}>
      <div className={styles.dropdownContainer}>
        <label className={styles.dropdownLabel}>Color Space</label>
        <select
          id="color-space-choice"
          className={styles.dropdown}
          value={colorSpace ?? ""}
          onChange={(e) => setColorSpace(e.target.value as ColorSpaceType)}
        >
          {COLOR_SPACE_OPTIONS.map((c) => (
            <option key={`option-${c}`} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.dropdownContainer}>
        <label className={styles.dropdownLabel}> Color Combination</label>
        <select
          id="color-space-choice"
          className={styles.dropdown}
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
    </div>
  );
}

export default ColorPickerDropdowns;
