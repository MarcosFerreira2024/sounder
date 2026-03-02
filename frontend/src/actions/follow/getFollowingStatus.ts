import { routes } from "../../consts/routes";

async function getFollowingStatus(userId: string) {
  const response = await fetch(routes.follow.isFollowingUser(userId), {
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

export { getFollowingStatus };
