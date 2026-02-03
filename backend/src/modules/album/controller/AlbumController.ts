import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAlbums } from "../useCases/GetAlbums";
import { normalizePagination } from "../../../shared/helpers/normalizePagination";
import { GetAlbumById } from "../useCases/GetAlbumById";
import { DeleteAlbum } from "../useCases/DeleteAlbum";
import { CreateAlbum } from "../useCases/CreateAlbum";
import { UpdateAlbum } from "../useCases/UpdateAlbum";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { AppUser } from "../../../shared/types/user";

class AlbumController {
  async create(req: Request, res: Response) {
    try {
      const album = await container.resolve(CreateAlbum).execute({
        user: req.user as AppUser,
        name: req.body.name,
        artistId: req.body.artistId,
        coverImage: {
          buffer: req.file!.buffer,
          originalName: req.file!.originalname,
          mimeType: req.file!.mimetype
        }
  })

      return res
        .status(201)
        .json({ data: album, message: "Album created successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await container.resolve(DeleteAlbum).execute(req.user!, req.params.id as string);

      return res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const album = await container.resolve(GetAlbumById).execute(req.params.id as string);


      return res.status(200).json({data:album, message:"Album fetched successfully"});
    } catch (error) {
      return handleAppError(res, error);
    }
  }


  async get(req: Request, res: Response) {
    try {
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!
      );


      const albums = await container
        .resolve(GetAlbums)
        .execute(page, limit, req.query);

      return res.status(200).json({data:albums, message:"Albums fetched successfully"});
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await container
        .resolve(UpdateAlbum)
        .execute(req.user!, req.params.id as string, req.body);

      return res.status(200).json({data:updated, message: "Album updated successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }
}

export { AlbumController };