import { routes } from "../../consts/routes";

async function addToPlaylist(musicId: string, playlistId: string) {
  const response = await fetch(
    routes.music.addToPlaylist(musicId, playlistId),
    {
      method: "POST",
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

export default addToPlaylist;
