import { routes } from "../../consts/routes";

async function createPlaylist(name: string, file?: File | null) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", file ?? "");

  const response = await fetch(routes.playlist.createPlaylist, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export { createPlaylist };
