import { Request, Response } from "express";
import { container } from "tsyringe";
import { AssignUserAsArtist } from "../useCases/AssignUserAsArtist";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { normalizePagination } from "../../../shared/helpers/normalizePagination";
import { FindArtists } from "../useCases/FindArtist";

class ArtistController {
  async assignUserAsArtist(req: Request, res: Response) {
    try {
      await container
        .resolve(AssignUserAsArtist)
        .execute(req.user!, req.params.userId as string);

      return res.status(201).json({ message: "Artist Assigned successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }

  async findArtists(req: Request, res: Response) {
    try {
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit as unknown as number,
        req.user!,
      );

      const search = {
        name: req.query.name as string | undefined,
        id: req.query.id as string | undefined,
        musicName: req.query.musicName as string | undefined,
        albumName: req.query.albumName as string | undefined,
      };
      const matchType: "startsWith" | "contains" =
        (req.query.match as "startsWith" | "contains") || "contains";

      const artists = await container
        .resolve(FindArtists)
        .execute(search, page, limit, matchType);

      return res
        .status(200)
        .json({ data: artists, message: "Artists fetched successfully" });
    } catch (e) {
      return handleAppError(res, e);
    }
  }
}

export { ArtistController };
