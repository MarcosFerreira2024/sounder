import { routes } from "../../consts/routes";
import type { PublicUser } from "../../hooks/useProfile";

async function updateUserData(data: Partial<PublicUser>) {
  const response = await fetch(routes.user.updateUser(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await response.json();

  return json.data;
}

export { updateUserData };
