import { createContext, useContext } from "react";
import { usePlaylist } from "../hooks/usePlaylist";

type PlaylistContextType = ReturnType<typeof usePlaylist>;

const PlaylistContext = createContext<PlaylistContextType | null>(null);

type PlaylistProviderProps = {
  children: React.ReactNode;
  playlistId?: string;
};

export function PlaylistProvider({
  children,
  playlistId,
}: PlaylistProviderProps) {
  const data = usePlaylist(playlistId);

  return (
    <PlaylistContext.Provider value={{ ...data }}>
      {data.loading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "usePlaylistContext must be used within a PlaylistProvider",
    );
  }

  return context;
}
