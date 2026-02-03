import { Router } from 'express';
import { GameController } from '../controllers/GameController';
import { requireAuth } from '../../../middleware/requireAuth';
import { deserializeUser } from '../../../middleware/deserializeUser';
import { validate } from '../../../middleware/validateSchema';
import { answer, gameId, gamemodeId } from '../schemas/schema';
import z from 'zod';

function  gameRoutes (): Router {
    const gameController = new GameController();

    const gameRoutes = Router();
    
    gameRoutes.post('/start',deserializeUser,requireAuth, gameController.startSession);
    gameRoutes.get('/state',deserializeUser,requireAuth,validate({ query: z.object({gameId}) }), gameController.getGameState);
    gameRoutes.post('/answer',deserializeUser,requireAuth,validate({ body: answer }), gameController.answer);
    gameRoutes.get('/user-stats',deserializeUser,requireAuth,validate({ query: z.object({gamemodeId}) }), gameController.getUserStats);

    gameRoutes.delete('/daily-game',deserializeUser,requireAuth, gameController.deleteDailyGame);
    gameRoutes.get('/daily-game',deserializeUser,requireAuth, gameController.getTodayGames);
    return gameRoutes
};


export { gameRoutes };
