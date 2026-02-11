import { routes } from "../../consts/routes";

async function getUserFollowers(userId: string) {
  const response = await fetch(routes.follow.getFollowersById(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();

  return json.data;
}

export default getUserFollowers;
