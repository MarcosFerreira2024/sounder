import { requireAuth } from "../../../middleware/requireAuth.js";
import { deserializeUser } from "../../../middleware/deserializeUser.js";
import { Router } from "express";
import { SearchController } from "../controllers/SearchController.js";

export function searchRoutes(): Router {
  const router = Router();

  const searchController = new SearchController();

  router.get("/", deserializeUser, requireAuth, searchController.search);

  return router;
}
