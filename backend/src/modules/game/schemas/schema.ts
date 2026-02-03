import { z } from "zod";
import { zodErrorMessages } from "../../../shared/constants/errors";

export const gameId = z.uuid({error: zodErrorMessages.invalid("game ID") })

export const gamemodeId = z.uuid({error: zodErrorMessages.invalid("gamemode Id") }).min(1, zodErrorMessages.required("Gamemode Id"))

export const answer = z.object({
  answer: z.string().min(1, zodErrorMessages.required("Answer")),
  gameId,
  gamemodeId,
});
