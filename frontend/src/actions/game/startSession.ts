import { routes } from "../../consts/routes";

async function startSession(mode: string) {
  const response = await fetch(routes.game.start(mode), {
    method: "POST",
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

export { startSession };
