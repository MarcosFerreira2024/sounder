import { routes } from "../../consts/routes";

async function getPlaylistById(id?: string | undefined | null) {
  if (id === null || id === undefined) id = "";

  const response = await fetch(routes.playlist.getPlaylistById(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const playlist = await response.json();

  if (!response.ok) {
    throw new Error(playlist.message);
  }

  return playlist.data;
}

export default getPlaylistById;
