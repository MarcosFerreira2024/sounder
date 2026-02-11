import { Request, Response } from "express";
import { normalizePagination } from "../../../shared/helpers/normalizePagination";
import { container } from "tsyringe";
import { CreatePlaylist } from "../useCases/CreatePlaylist";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { DeletePlaylist } from "../useCases/DeletePlaylist";
import { GetMusicsByPlaylistId } from "../useCases/GetMusicsByPlaylistId";
import { UpdatePlaylist } from "../useCases/UpdatePlaylist";
import { RemoveFromPlaylist } from "../useCases/RemoveFromPlaylist";
import { AddMusicToPlaylist } from "../useCases/AddToPlaylist";
import { GetUserPlaylists } from "../useCases/GetUserPlaylists";
import { GetPlaylistById } from "../useCases/GetPlaylistById";

class PlaylistController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const image = req.file
        ? {
            buffer: req.file.buffer,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
          }
        : null;

      const playlist = await container.resolve(CreatePlaylist).execute({
        image,
        user: req.user!,
        name: req.body.name,
        userId: (req.body.userId as string) ?? undefined,
      });

      return res
        .status(201)
        .json({ data: playlist, message: "Playlist created successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const playlist = await container
        .resolve(GetPlaylistById)
        .execute(req.params.playlistId as string, req.user!);

      return res
        .status(200)
        .json({ data: playlist, message: "Playlist fetched successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await container
        .resolve(DeletePlaylist)
        .execute(req.params.playlistId as string, req.user!);

      return res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getUserPlaylists(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query as { userId: string | undefined };
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!,
      );

      const playlists = await container
        .resolve(GetUserPlaylists)
        .execute(userId, req.user, page, limit);

      return res
        .status(200)
        .json({ data: playlists, message: "Playlists fetched successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getPlaylistMusics(req: Request, res: Response): Promise<Response> {
    try {
      const { limit, page } = normalizePagination(
        req.query.page as unknown as number,
        req.query.limit! as unknown as number,
        req.user!,
      );

      const musics = await container
        .resolve(GetMusicsByPlaylistId)
        .execute(req.params.playlistId as string, req.user!, page, limit);

      return res.status(200).json({
        data: musics,
        message: "Playlist musics fetched successfully",
      });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async removeMusicFromPlaylist(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { musicId } = req.params as { musicId: string | undefined };
      const { playlistId } = req.params as { playlistId: string | undefined };
      await container
        .resolve(RemoveFromPlaylist)
        .execute(playlistId!, musicId!, req.user!);
      return res
        .status(200)
        .json({ message: "Music removed from playlist successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async addMusicToPlaylist(req: Request, res: Response): Promise<Response> {
    try {
      const { musicId } = req.params as { musicId: string | undefined };
      const { playlistId } = req.params as { playlistId: string | undefined };

      await container
        .resolve(AddMusicToPlaylist)
        .execute(playlistId!, musicId!, req.user!);
      return res
        .status(200)
        .json({ message: "Music added to playlist successfully" });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedPlaylist = await container
        .resolve(UpdatePlaylist)
        .execute(req.params.playlistId as string, req.body, req.user!);
      return res.status(200).json({
        data: updatedPlaylist,
        message: "Playlist updated successfully",
      });
    } catch (error: any) {
      return handleAppError(res, error);
    }
  }
}

export { PlaylistController };
