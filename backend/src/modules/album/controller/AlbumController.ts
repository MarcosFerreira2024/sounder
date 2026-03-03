import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAlbums } from "../useCases/GetAlbums.js";
import { normalizePagination } from "../../../shared/helpers/normalizePagination.js";
import { GetAlbumById } from "../useCases/GetAlbumById.js";
import { DeleteAlbum } from "../useCases/DeleteAlbum.js";
import { CreateAlbum } from "../useCases/CreateAlbum.js";
import { UpdateAlbum } from "../useCases/UpdateAlbum.js";
import { handleAppError } from "../../../shared/helpers/handleAppError.js";
import { AppUser } from "../../../shared/types/user.js";
import { GetAlbumMusics } from "../useCases/GetAlbumMusics.js";

class AlbumController {
  async getMusics(req: Request, res: Response) {
    try {
      const musics = await container
        .resolve(GetAlbumMusics)
        .execute(req.params.albumId as string);
      return res
        .status(200)
        .json({ data: musics, message: "Album musics fetched successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const album = await container.resolve(CreateAlbum).execute({
        user: req.user as AppUser,
        name: req.body.name,
        artistId: req.body.artistId,
        coverImage: {
          buffer: req.file!.buffer,
          originalName: req.file!.originalname,
          mimeType: req.file!.mimetype,
        },
      });

      return res
        .status(201)
        .json({ data: album, message: "Album created successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await container
        .resolve(DeleteAlbum)
        .execute(req.user!, req.params.albumId as string);

      return res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const album = await container
        .resolve(GetAlbumById)
        .execute(req.params.albumId as string);

      return res
        .status(200)
        .json({ data: album, message: "Album fetched successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!,
      );

      const albums = await container
        .resolve(GetAlbums)
        .execute(page, limit, req.query);

      return res
        .status(200)
        .json({ data: albums, message: "Albums fetched successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await container
        .resolve(UpdateAlbum)
        .execute(req.user!, req.params.albumId as string, req.body);

      return res
        .status(200)
        .json({ data: updated, message: "Album updated successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }
}

export { AlbumController };
