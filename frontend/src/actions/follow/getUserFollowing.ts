import { routes } from "../../consts/routes";

async function getUserFollowing(userId: string) {
  const response = await fetch(routes.follow.getFollowingsById(userId), {
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

  return json.data.items;
}
export default getUserFollowing;
