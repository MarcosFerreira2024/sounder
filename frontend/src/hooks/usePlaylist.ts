import { useEffect, useState } from "react";
import getPlaylistById from "../actions/playlists/getById";
import getMusicsByPlaylistId from "../actions/music/getMusicsByPlaylistId";
import type { Music } from "./useAudio";

export type Playlist = {
  id: string;
  name: string;
  image: string;
  visibility: "PUBLIC" | "PRIVATE";
  musics?: Music[];
  ownerId: string;
  createdAt: string;
};

export function usePlaylist(playlistId?: string) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!playlistId) {
      setPlaylist(null);
      setMusics([]);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const [playlist, musics] = await Promise.all([
          getPlaylistById(playlistId),
          getMusicsByPlaylistId(playlistId),
        ]);

        setPlaylist(playlist);
        setMusics(musics);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [playlistId]);

  return { playlist, musics, loading };
}
