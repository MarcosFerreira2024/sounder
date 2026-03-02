import { routes } from "../../consts/routes";

async function dislikeMusic(musicId: string) {
  const response = await fetch(routes.music.dislike(musicId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export default dislikeMusic;
