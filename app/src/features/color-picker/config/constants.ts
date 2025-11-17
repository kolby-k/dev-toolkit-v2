export type ColorCombinationTypes =
  | "complementary"
  | "analogous"
  | "monochromatic"
  | "triad"
  | "split-complementary"
  | "tetradic";

export const COLOR_COMBO_OPTIONS: ColorCombinationTypes[] = [
  "complementary",
  "analogous",
  "monochromatic",
  "triad",
  "split-complementary",
  "tetradic",
];

export type ColorSpaceType = "rgb" | "hsl" | "oklch";
export const COLOR_SPACE_OPTIONS: ColorSpaceType[] = ["rgb", "hsl", "oklch"];
