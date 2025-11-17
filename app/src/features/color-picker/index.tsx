import ColorPicker from "./components/ColorPicker";
import type { ColorSpaceType } from "./config/constants";

export type ColorPickerData = { color: string; label: string };

export type ColorSpaceData = {
  colorSpace: ColorSpaceType;
  values: [number, number, number]; // represent rgb | hsl | oklch
  min: number;
  max: number;
};

function index() {
  return <ColorPicker />;
}

export default index;
