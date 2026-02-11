import type { QueryType, SearchResult } from "../hooks/useSearch";

function hasResults(data: SearchResult, type: QueryType) {
  if (!data) return false;

  if (type === "all") {
    return Object.values(data).some(
      (items) => Array.isArray(items) && items.length > 0,
    );
  }

  const items = data[type];
  return Array.isArray(items) && items.length > 0;
}

export { hasResults };
