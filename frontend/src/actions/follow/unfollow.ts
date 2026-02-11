import { routes } from "../../consts/routes";

async function unfollow(userId: string) {
  const response = await fetch(routes.follow.unfollow(userId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const json = await response.json();

  return true;
}

export { unfollow };
