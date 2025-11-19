import { TOOLS } from "../config/constants";

import ColorPicker from "../features/color-picker/index";
import JsonFormatter from "../features/json-formatter/index";
import APIKeyGenerator from "../features/api-key-gen/index";
import CharacterCounter from "../features/character-counter/index";
import TextCompare from "../features/text-compare/index";

export const toolRoutes = [
  { path: l("Color Picker"), element: <ColorPicker /> },
  { path: l("JSON Formatter"), element: <JsonFormatter /> },
  { path: l("API Key Generator"), element: <APIKeyGenerator /> },
  { path: l("Character Counter"), element: <CharacterCounter /> },
  { path: l("Text Compare"), element: <TextCompare /> },
];

// get the href of the tool from /config/constanst; fallback to label name.
function l(label: string): string {
  const lowerLabel = label.toLowerCase();
  return (
    TOOLS.find((t) => t.label.toLowerCase() === lowerLabel)?.href ||
    `/tools/${lowerLabel}`
  );
}
