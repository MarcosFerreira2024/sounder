import { Request, Response } from "express";
import { container } from "tsyringe";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { QueryType } from "../services/SearchService";
import { SearchByQuery } from "../useCases/searchByQuery";

class SearchController {
  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string;
      const type = req.query.type as QueryType;

      const data = await container.resolve(SearchByQuery).execute(query, type);

      return res
        .status(200)
        .json({ data, message: "Search results fetched successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }
}

export { SearchController };
