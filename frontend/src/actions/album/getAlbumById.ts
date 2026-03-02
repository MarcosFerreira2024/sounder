import { routes } from "../../consts/routes";

async function getAlbumById(id: string) {
  const response = await fetch(routes.album.getAlbumById(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const album = await response.json();

  if (!response.ok) {
    throw new Error(album.message);
  }

  return album.data;
}

export default getAlbumById;
