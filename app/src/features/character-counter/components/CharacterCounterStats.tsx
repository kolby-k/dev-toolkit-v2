import { useEffect, useState } from "react";
import { STATS, type AggregateMethodResult } from "../index";
import { getCharacterCounterStats } from "../lib/stats";
import useDebounce from "../../../shared/hooks/useDebounce";

export interface CharacterCounterStatsProps {
  text: string;
}

function CharacterCounterStats({ text }: CharacterCounterStatsProps) {
  const [stats, setStats] = useState<null | AggregateMethodResult[]>(null);

  const debouncedText = useDebounce({ input: text });

  useEffect(() => {
    if (debouncedText) {
      const current = STATS.map((s) =>
        getCharacterCounterStats(s.agg, s.label, debouncedText)
      );
      setStats(current);
    }
  }, [debouncedText]);

  if (!stats || stats.length === 0) return null;

  return (
    <div id="character-count-stats">
      {stats &&
        stats.map((s, idx) => {
          return (
            <span key={`stat-${idx}`}>
              <h4>{s.valueString}</h4>
              <label>{s.label}</label>
            </span>
          );
        })}
    </div>
  );
}

export default CharacterCounterStats;
