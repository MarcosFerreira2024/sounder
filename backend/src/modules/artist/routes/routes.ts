import { Router } from "express";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { ArtistController } from "../controllers/ArtistController";
import { requireAuth } from "../../../middleware/requireAuth";


function artistRoutes():Router {

    const router = Router();

    const controller = new ArtistController();


    router.get("/",deserializeUser, requireAuth, controller.findArtists);


    router.post("/assign/:userId",deserializeUser, requireAuth, controller.assignUserAsArtist);

    return router


}

export {artistRoutes}