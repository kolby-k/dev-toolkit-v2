import { useState } from "react";

import CustomTextAreaV1 from "../../../shared/components/ui/CustomTextAreaV1";
import "../styles/CharacterCounter.css";

export type AggregateMethod = "sum" | "avg" | "max" | "min";

export interface StatItem {
  agg: AggregateMethod;
  label: string;
}

const STATS: StatItem[] = [
  { agg: "sum", label: "Total Characters" },
  { agg: "max", label: "Longest Word" },
  { agg: "min", label: "Shortest Word" },
];
function CharacterCounter() {
  const [text, setText] = useState<string>("");

  return (
    <div id="character-counter-page">
      <h3 id="tool-page-title">Character Counter</h3>

      <section id="character-counter-section">
        <div id="character-count-stats">
          {STATS.map((s, idx) => {
            return (
              <span key={`stat-${idx}`}>
                <h4>{getStatValue(s.agg, text)}</h4>
                <label>{s.label}</label>
              </span>
            );
          })}
        </div>
        <CustomTextAreaV1 text={text} setText={setText} />
      </section>
    </div>
  );
}

export default CharacterCounter;

function getStatValue(calculation: AggregateMethod, text: string): string {
  if (!text || text.length < 1) return "0";

  if (calculation === "sum") {
    return text.length.toString();
  }

  if (calculation === "max") {
    const words = text.match(/\b[\w'-]+\b/g);
    const longest = words
      ? words.reduce((a, b) => (b.length > a.length ? b : a))
      : "0";

    return longest.length.toString();

    // return `${longest.length} character${
    //   longest.length > 1 ? "s" : ""
    // } (${longest})`;
  }

  if (calculation === "min") {
    const words = text.match(/\b[\w'-]+\b/g);
    console.log(words);
    const shortest = words
      ? words.reduce((a, b) => (b.length < a.length ? b : a))
      : "0";

    return shortest.length.toString();

    // return `${shortest.length} character${
    //   shortest.length > 1 ? "s" : ""
    // } (${shortest})`;
  }

  return "n/a";
}
