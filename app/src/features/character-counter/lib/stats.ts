import type { AggregateMethod, AggregateMethodResult } from "../index";

export function getCharacterCounterStats(
  calculation: AggregateMethod,
  label: string,
  text: string
): AggregateMethodResult {
  const l = label.toLowerCase();

  if (!text || text.length < 1) {
    return {
      method: calculation,
      value: null,
      valueString: "n/a",
      label,
    };
  }

  if (calculation === "sum") {
    if (l === "characters") {
      const value = text.length;
      return {
        method: calculation,
        value,
        valueString: value.toString(),
        label,
      };
    } else if (l === "words") {
      const value = text.match(/\w+/g)?.length || 0;
      return {
        method: calculation,
        value,
        valueString: value.toString(),
        label,
      };
    } else if (l === "characters w/ spaces") {
      const value = text.match(/\S/g)?.length || 0;
      return {
        method: calculation,
        value,
        valueString: value.toString(),
        label,
      };
    }
  }

  if (calculation === "max") {
    const words = text.match(/\b[\w'-]+\b/g);
    const longest = words
      ? words.reduce((a, b) => (b.length > a.length ? b : a))
      : "0";

    const value = longest.length;
    return {
      method: calculation,
      value,
      valueString: value.toString(),
      label,
    };
  }

  if (calculation === "min") {
    const words = text.match(/\b[\w'-]+\b/g);
    console.log(words);
    const shortest = words
      ? words.reduce((a, b) => (b.length < a.length ? b : a))
      : "0";

    const value = shortest.length;

    return {
      method: calculation,
      value,
      valueString: value.toString(),
      label,
    };
  }

  return {
    method: calculation,
    value: null,
    valueString: "n/a",
    label,
  };
}
