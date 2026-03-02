import { routes } from "../../consts/routes";

async function deletePlaylist(playlistId: string) {
  const response = await fetch(routes.playlist.deletePlaylist(playlistId), {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ playlistId }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export { deletePlaylist };
