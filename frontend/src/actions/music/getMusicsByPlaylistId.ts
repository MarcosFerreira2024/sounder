import { routes } from "../../consts/routes";

async function getMusicsByPlaylistId(playlistId?: string) {
  if (!playlistId) return [];
  const response = await fetch(routes.music.getMusicsByPlaylistId(playlistId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();

  return json.data.items;
}

export default getMusicsByPlaylistId;
