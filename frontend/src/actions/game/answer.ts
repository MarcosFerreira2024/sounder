import { routes } from "../../consts/routes";

async function sendAnswer(answer: string, mode: string) {
  const response = await fetch(routes.game.answer(mode), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ answer }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}

export { sendAnswer };
