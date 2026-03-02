import { routes } from "../../consts/routes";

async function getArtists(query?: string) {
  const response = await fetch(routes.artist.getArtists(query), {
    method: "GET",
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

export default getArtists;
