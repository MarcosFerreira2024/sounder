import type { QueryType, SearchResult } from "../hooks/useSearch";

function hasResults(
  type: QueryType,
  isLoading: boolean,
  data?: SearchResult | null,
) {
  if (!data) return;
  if (isLoading) return;

  if (type === "all") {
    return Object.values(data).some(
      (items) => Array.isArray(items) && items.length > 0,
    );
  }

  const items = data[type];
  return Array.isArray(items) && items.length > 0;
}

export { hasResults };
