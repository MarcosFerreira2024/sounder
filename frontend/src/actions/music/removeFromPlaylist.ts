import { routes } from "../../consts/routes";

async function removeFromPlaylist(playlistId: string, musicId: string) {
  const response = await fetch(
    routes.music.removeFromPlaylist(musicId, playlistId),
    {
      method: "DELETE",
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

  return json.data;
}

export default removeFromPlaylist;
