export type ToolCategoryTypes = "utility" | "security" | "design";

export interface ToolItem {
  label: string;
  description: string;
  href: string;
  category: ToolCategoryTypes[];
  isFrontend: boolean;
  isBackend: boolean;
}

export const TOOLS: ToolItem[] = [
  {
    label: "API Key Generator",
    description:
      "Create a random and secure API Key of various lengths and encoding types.",
    href: "/tools/api-key-generator",
    category: ["security"],
    isFrontend: true,
    isBackend: true,
  },

  {
    label: "Character Counter",
    description: "Count characters, words, and lines in text.",
    href: "/tools/character-counter",
    category: ["utility"],
    isFrontend: true,
    isBackend: false,
  },
  {
    label: "Color Picker",
    description: "Easily compare colors and copy them as CSS snippets.",
    href: "/tools/color-picker",
    category: ["design"],
    isFrontend: true,
    isBackend: false,
  },
  {
    label: "JSON Formatter",
    description: "Quickly turn your JSON into a clean and readable format.",
    href: "/tools/json-formatter",
    category: ["utility"],
    isFrontend: true,
    isBackend: false,
  },
  {
    label: "Epoch Timestamp Converter",
    description: "Convert UNIX Epoch timestamps into human readable dates.",
    href: "/tools/epoch-timestamp-converter",
    category: ["utility"],
    isFrontend: true,
    isBackend: true,
  },
  {
    label: "Text Compare",
    description:
      "Highlight differences between two pieces of text side by side.",
    href: "/tools/text-compare",
    category: ["utility"],
    isFrontend: true,
    isBackend: false,
  },
  {
    label: "JSON Generator",
    description: "Generate mock JSON data from templates or schemas.",
    href: "/tools/json-generator",
    category: ["utility"],
    isFrontend: false,
    isBackend: true,
  },
  {
    label: "JWT Decode",
    description: "Decode and inspect a JSON Web Token.",
    href: "/tools/jwt-decode",
    category: ["security"],
    isFrontend: true,
    isBackend: false,
  },
];
