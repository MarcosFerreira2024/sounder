import { Router } from "express";
import { GameController } from "../controllers/GameController.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { validate } from "../../../middleware/validateSchema.js";
import { answer, gameId, gamemodeId, mode } from "../schemas/schema.js";
import z from "zod";

function gameRoutes(): Router {
  const gameController = new GameController();

  const gameRoutes = Router();

  gameRoutes.post(
    "/start",
    deserializeUser,
    requireAuth,
    validate({ query: z.object({ mode }) }),
    gameController.startSession,
  );
  gameRoutes.get(
    "/state",
    deserializeUser,
    requireAuth,
    validate({ query: z.object({ mode }) }),
    gameController.getGameState,
  );
  gameRoutes.post(
    "/answer",
    deserializeUser,
    requireAuth,
    validate({ query: z.object({ mode }), body: answer }),
    gameController.answer,
  );
  gameRoutes.get(
    "/user-stats",
    deserializeUser,
    requireAuth,
    validate({ query: z.object({ mode }) }),
    gameController.getUserStats,
  );

  gameRoutes.delete(
    "/daily-game",
    deserializeUser,
    requireAuth,
    gameController.deleteDailyGame,
  );
  gameRoutes.get(
    "/daily-game",
    deserializeUser,
    requireAuth,
    gameController.getTodayGames,
  );
  return gameRoutes;
}

export { gameRoutes };
