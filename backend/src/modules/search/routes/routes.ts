import { requireAuth } from "../../../middleware/requireAuth";
import { deserializeUser } from "../../../middleware/deserializeUser";
import { Router } from "express";
import { SearchController } from "../controllers/SearchController";

export function searchRoutes(): Router {
  const router = Router();

  const searchController = new SearchController();

  router.get("/", deserializeUser, requireAuth, searchController.search);

  return router;
}
