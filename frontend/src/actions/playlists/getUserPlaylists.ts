import { routes } from "../../consts/routes";

async function getUserPlaylists(id?: string | undefined | null) {
  if (id === null || id === undefined) id = "";

  const response = await fetch(routes.playlist.getUserPlaylists(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const playlists = await response.json();

  if (!response.ok) {
    throw new Error(playlists.message);
  }

  return playlists.data;
}

export default getUserPlaylists;
