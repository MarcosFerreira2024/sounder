import { routes } from "../../consts/routes";
import type { Playlist } from "../../hooks/usePlaylist";

async function updatePlaylist(data: Partial<Playlist>, playlistId: string) {
  const response = await fetch(routes.playlist.updatePlaylist(playlistId), {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export { updatePlaylist };
