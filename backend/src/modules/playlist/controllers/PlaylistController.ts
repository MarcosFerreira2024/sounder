import { Request, Response } from "express";
import { handleAppError } from "../../../shared/helpers/handleAppError";
import { container } from "tsyringe";
import { CreatePlaylist } from "../useCases/CreatePlaylist";
import { DeletePlaylist } from "../useCases/DeletePlaylist";
import { GetPlaylistsByUserId } from "../useCases/GetPlaylistsByUserId";
import { UpdatePlaylist } from "../useCases/UpdatePlaylist";
import { GetMusicsByPlaylistId } from "../useCases/GetMusicsByPlaylistId";

class PlaylistController {
  async create(req: Request, res: Response): Promise<Response> {

    try {
      console.log({body:req.body,user:req.user})
      const playlist = await container.resolve(CreatePlaylist).execute(req.user!, {name: req.body.name, photo: req.body.photo});

      return res.status(201).json({ data:playlist,message: "Playlist created successfully" });
    }
    catch (error: any) {
      return handleAppError(res, error);
    }


  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await container.resolve(DeletePlaylist).execute(req.params.userId as string,req.user!);

      return res.json({ message: "Playlist deleted successfully" });
    }
    catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getPlaylistsByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const playlists = await container.resolve(GetPlaylistsByUserId).execute(req.params.userId as string,req.user);


      return res.json({data:playlists, message:"Playlists fetched successfully"});
    }
    catch (error: any) {
      return handleAppError(res, error);
    }
  }

  async getPlaylistMusics(req: Request, res: Response): Promise<Response> {
    try {
      const musics = await container.resolve(GetMusicsByPlaylistId).execute(req.params.userId as string,req.user!);

      return res.json({data:musics, message:"Playlist musics fetched successfully"});

    }
    catch (error: any) {
      return handleAppError(res, error);   
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedPlaylist = await container.resolve(UpdatePlaylist).execute( req.params.playlistId as string, req.body, req.user! );
      return res.json({data:updatedPlaylist, message: "Playlist updated successfully" });
    }
    catch (error: any) {
      return handleAppError(res, error);
    }
  }
}

export { PlaylistController }