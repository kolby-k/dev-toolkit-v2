import ToolHeader from "../../shared/components/ui/ToolHeader";
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
      <ToolHeader
        title="Character Counter"
        description="Type below to see the total number of words, characters and more"
      />
      <CharacterCounter />
    </div>
  );
}

export default index;
