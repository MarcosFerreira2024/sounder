import type { Music } from "../../hooks/useAudio";

async function getRecommendations() {
  const response = await fetch(
    "http://localhost:3000/api/music/recommendations",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data.items as Music[];
}

export default getRecommendations;
