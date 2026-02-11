import { useEffect, useState } from "react";
import type { Playlist } from "./usePlaylist";
import getUserPlaylists from "../actions/playlists/getUserPlaylists";

export function useUserPlaylists(userId?: string) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setPlaylists([]);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await getUserPlaylists(userId);
        setPlaylists(res.items);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [userId]);

  return { playlists, loading };
}
