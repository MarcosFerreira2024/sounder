import { routes } from "../../consts/routes";

async function follow(userId: string) {
  const response = await fetch(routes.follow.follow(userId), {
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

  return true;
}

export { follow };
