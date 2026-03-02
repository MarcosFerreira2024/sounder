import { routes } from "../../consts/routes";

async function getUserGameStats(mode: string) {
  const response = await fetch(routes.game.stats(mode), {
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

export { getUserGameStats };
