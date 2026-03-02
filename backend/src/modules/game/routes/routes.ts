import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { requireAuth } from "../../../middleware/requireAuth";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { validate } from "../../../middleware/validateSchema";
import { answer, gameId, gamemodeId, mode } from "../schemas/schema";
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
