import { useNavigate, useParams } from "react-router-dom";
import type { Playlist } from "../../hooks/usePlaylist";
import PlaylistProfileCard from "../playlist/PlaylistProfileCard";

interface ProfilePlaylistsProps {
  playlists: Playlist[] | [];
}

export function ProfilePlaylists({ playlists }: ProfilePlaylistsProps) {
  const navigate = useNavigate();
  const { userId } = useParams();

  if (playlists.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <h1
          onClick={() => navigate(`/profile/${userId}/playlists`)}
          className="text-main text-2xl"
        >
          Playlists:
        </h1>
        <div className="flex gap-4 w-full h-full overflow-hidden">
          {playlists.map((playlist) => (
            <PlaylistProfileCard
              className="min-w-[328px] min-h-[216px] max-w-[328px] max-h-[216px]"
              key={playlist.id}
              {...playlist}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
