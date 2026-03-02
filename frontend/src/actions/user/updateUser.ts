import { routes } from "../../consts/routes";
import type { User } from "../../hooks/useUser";

async function updateUserData(data: Partial<User>) {
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
