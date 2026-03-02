import { routes } from "../../consts/routes";

async function getMusicById(musicId: string) {
  const response = await fetch(routes.music.getById(musicId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const music = await response.json();

  if (!response.ok) {
    throw new Error(music.message);
  }

  return music.data;
}

export default getMusicById;
