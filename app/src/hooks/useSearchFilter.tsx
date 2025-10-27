import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { TOOLS, type ToolItem } from "../constants";

function useSearchFilter() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const [params] = useSearchParams();
  const categoryParamRaw = params.get("category");
  const categoryParam = categoryParamRaw?.toLowerCase() ?? "";

  const filteredTools = useMemo<ToolItem[]>(() => {
    const userSearch = userSearchInput.trim().toLowerCase();

    const byCategory = TOOLS.filter((t) => {
      if (!categoryParam) return true;
      // compare normalized categories
      return t.category.some((c) => c.toLowerCase() === categoryParam);
    });

    if (!userSearch) return byCategory;

    return byCategory.filter((t) => {
      const labelMatch = t.label.toLowerCase().includes(userSearch);
      const categoryMatch = t.category.some((c) =>
        c.toLowerCase().includes(userSearch)
      );
      return labelMatch || categoryMatch;
    });
  }, [categoryParam, userSearchInput]);

  return {
    userSearchInput,
    setUserSearchInput,
    categoryParam,
    filteredTools,
  };
}

export default useSearchFilter;
