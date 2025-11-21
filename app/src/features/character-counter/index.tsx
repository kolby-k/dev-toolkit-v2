import CharacterCounter from "./components/CharacterCounter";

export type AggregateMethod = "sum" | "avg" | "max" | "min";

export type AggregateMethodResult = {
  method: AggregateMethod;
  value: number | null;
  valueString: string | "n/a";
  label: string;
};

export interface StatItem {
  agg: AggregateMethod;
  label: string;
}

export const STATS: StatItem[] = [
  { agg: "sum", label: "Characters" },
  { agg: "sum", label: "Characters w/ Spaces" },
  { agg: "sum", label: "Words" },
  { agg: "max", label: "Longest Word" },
  { agg: "min", label: "Shortest Word" },
];

function index() {
  return (
    <div id="character-counter-page">
      <h3 id="tool-page-title">Character Counter</h3>
      <p>
        Type something below to see the total number of words, character{" "}
        <span className="fancy-label">(including whitespace)</span>, and more!
      </p>
      <CharacterCounter />
    </div>
  );
}

export default index;
