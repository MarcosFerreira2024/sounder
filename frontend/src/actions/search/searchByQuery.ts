import { routes } from "../../consts/routes";
import type { QueryType } from "../../hooks/useSearch";

async function searchByQuery(q: string, type: QueryType) {
  const response = await fetch(routes.search.searchByQuery(q, type), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export { searchByQuery };
