import { useAppNotifications } from "../contexts/NotificationsContext";
import { useQuery } from "@tanstack/react-query";
import getUserPlaylists from "../actions/playlists/getUserPlaylists";
import type { Playlist } from "./usePlaylist";

export function useUserPlaylists(userId?: string | null) {
  const { setNotification } = useAppNotifications();

  const query = useQuery<{ items: Playlist[] }, Error>({
    queryKey: ["playlists", userId],
    queryFn: async () => {
      if (!userId) return { items: [] };
      return getUserPlaylists(userId);
    },
    enabled: !!userId,
  });

  if (query.error) {
    setNotification((query.error as Error).message);
  }

  return {
    playlists: query.data?.items ?? [],
    loading: query.isLoading,
  };
}
