import { useEffect, useState } from "react";

export interface UseDebounceProps {
  input: string;
  delayMs?: number;
}
function useDebounce({ input, delayMs = 500 }: UseDebounceProps): string {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(input);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [input, delayMs]);

  return debouncedQuery;
}

export default useDebounce;
