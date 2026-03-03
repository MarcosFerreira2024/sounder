import { routes } from "../../consts/routes";
import type { Music } from "../../hooks/useAudio";

async function getRecommendations() {
  const response = await fetch(routes.music.getRecommendations, {
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

  return json.data.items as Music[];
}

export default getRecommendations;
