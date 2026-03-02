import { routes } from "../../consts/routes";

async function getGameState(mode: string) {
  const response = await fetch(routes.game.state(mode), {
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

export { getGameState };
