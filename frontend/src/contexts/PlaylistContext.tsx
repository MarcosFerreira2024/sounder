import { createContext, useContext } from "react";
import { usePlaylist } from "../hooks/usePlaylist";

type PlaylistContextType = ReturnType<typeof usePlaylist>;

const PlaylistContext = createContext<PlaylistContextType | null>(null);

type PlaylistProviderProps = {
  children: React.ReactNode;
};

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const playlist = usePlaylist();

  return (
    <PlaylistContext.Provider value={playlist}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error(
      "usePlaylistContext must be used within a PlaylistProvider"
    );
  }

  return context;
}
