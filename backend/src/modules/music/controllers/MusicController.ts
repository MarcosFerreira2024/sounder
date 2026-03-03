import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateMusic } from "../useCases/CreateMusic.js";
import { GetMusics } from "../useCases/GetMusics.js";
import { GetMusicById } from "../useCases/GetMusicById.js";
import { normalizePagination } from "../../../shared/helpers/normalizePagination.js";
import { UpdateMusic } from "../useCases/UpdateMusic.js";
import { DeleteMusic } from "../useCases/DeleteMusic.js";
import { handleAppError } from "../../../shared/helpers/handleAppError.js";
import { LikeMusic } from "../useCases/LikeMusic.js";
import { DeslikeMusic } from "../useCases/DeslikeMusic.js";
import { AssignMusicToAlbum } from "../useCases/AssignMusicToAlbum.js";
import { UserMusicRecommendations } from "../useCases/UserMusicRecommendations.js";

class MusicController {
  async getRecommended(req: Request, res: Response) {
    try {
      const recommended = await container
        .resolve(UserMusicRecommendations)
        .execute(req.user!);

      return res
        .status(200)
        .json({ data: recommended, message: "Musics fetched successfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async assignToAlbum(req: Request, res: Response) {
    try {
      const assigned = await container
        .resolve(AssignMusicToAlbum)
        .execute(
          req.body.musicId,
          req.body.albumId,
          req.user!,
          req.body.artistId,
        );

      return res
        .status(200)
        .json({ data: assigned, message: "Music Assigned succesfully" });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, albumId, artistId } = req.body;
      const lyricsFile = req.file;



      const created = await container.resolve(CreateMusic).execute(
        req.user!,
        name,
        {
          buffer: lyricsFile!.buffer,
          originalName: lyricsFile!.originalname,
          mimeType: lyricsFile!.mimetype,
        },
        req.body.genres as string[],
        albumId,
        artistId,
      );

      return res.status(201).json({
        data: created,
        message: "Music created successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await container
        .resolve(DeleteMusic)
        .execute(req.user!, req.params.id as string);

      return res.status(200).json({
        message: "Music deleted successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await container
        .resolve(UpdateMusic)
        .execute(req.user!, req.params.id as string, { ...req.body });

      return res.status(200).json({
        data: updated,
        message: "Music updated successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit as unknown as number,

        req.user!,
      );

      const search = {
        name: req.query.name as string | undefined,
        authorName: req.query.authorName as string | undefined,
        id: req.query.id as string | undefined,
        authorId: req.query.authorId as string | undefined,
        audio: req.query.audio as string | undefined,
      };

      const musics = await container
        .resolve(GetMusics)
        .execute(page, limit, search);

      return res.json({
        data: musics,
        message: "Musics fetched successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const music = await container
        .resolve(GetMusicById)
        .execute(req.params.id as string);

      return res.json({
        data: music,
        message: "Music fetched successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async like(req: Request, res: Response) {
    try {
      const musicId = req.params.id as string;
      await container.resolve(LikeMusic).execute(musicId, req.user!);

      return res.status(200).json({
        message: "Music liked successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }

  async deslike(req: Request, res: Response) {
    try {
      const musicId = req.params.id as string;
      await container.resolve(DeslikeMusic).execute(musicId, req.user!);

      return res.status(200).json({
        message: "Music desliked successfully",
      });
    } catch (error) {
      return handleAppError(res, error);
    }
  }
}

export { MusicController };
