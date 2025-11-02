import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { TOOLS, type ToolItem } from "../constants";

function useSearchFilter() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const [params] = useSearchParams();
  const categoryParamRaw = params.get("category");
  const categoryParam = categoryParamRaw?.toLowerCase() ?? "";

  const stackParamRaw = params.get("stack");
  const stackParam = stackParamRaw?.toLowerCase() ?? "";

  const filteredTools = useMemo<ToolItem[]>(() => {
    const userSearch = userSearchInput.trim().toLowerCase();

    const byCategory = TOOLS.filter((t) => {
      if (!categoryParam) return true;
      // compare normalized categories
      return t.category.some((c) => c.toLowerCase() === categoryParam);
    });

    const byStack = byCategory.filter((t) => {
      if (!stackParam) return true;
      // return frontend or backend tools if stack param is defined, else no match
      return stackParam === "frontend"
        ? t.isFrontend
        : stackParam === "backend"
        ? t.isBackend
        : false;
    });

    if (!userSearch) return byStack;

    return byStack.filter((t) => {
      const labelMatch = t.label.toLowerCase().includes(userSearch);
      const categoryMatch = t.category.some((c) =>
        c.toLowerCase().includes(userSearch)
      );
      const stackMatch =
        (t.isFrontend && "frontend".includes(userSearch.toLowerCase())) ||
        (t.isBackend && "backend".includes(userSearch.toLowerCase()));

      return labelMatch || categoryMatch || stackMatch;
    });
  }, [categoryParam, userSearchInput, stackParam]);

  return {
    userSearchInput,
    setUserSearchInput,
    categoryParam,
    stackParam,
    filteredTools,
  };
}

export default useSearchFilter;
