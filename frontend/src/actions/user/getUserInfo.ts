import { routes } from "../../consts/routes";

async function getUserInfo(userId?: string | null) {
  const response = await fetch(routes.user.getUserInfo(userId), {
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

export default getUserInfo;
