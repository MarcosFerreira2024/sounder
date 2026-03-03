import { Router } from "express";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { ArtistController } from "../controllers/ArtistController.js";
import { requireAuth } from "../../../middleware/requireAuth.js";


function artistRoutes():Router {

    const router = Router();

    const controller = new ArtistController();


    router.get("/",deserializeUser, requireAuth, controller.findArtists);


    router.post("/assign/:userId",deserializeUser, requireAuth, controller.assignUserAsArtist);

    return router


}

export {artistRoutes}