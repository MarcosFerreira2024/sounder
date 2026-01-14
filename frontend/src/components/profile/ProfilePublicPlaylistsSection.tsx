import PlaylistProfileCard, {
  type PlaylistProfileCardProps,
} from "../playlist/PlaylistProfileCard";

interface ProfilePublicPlaylistsSectionProps {
  playlists: PlaylistProfileCardProps[];
}

export function ProfilePublicPlaylistsSection({
  playlists,
}: ProfilePublicPlaylistsSectionProps) {
  if (playlists.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-main text-2xl">Playlists Publicas:</h1>
        <div className="flex gap-4 w-full h-full overflow-hidden">
          {playlists.map((playlist) => (
            <PlaylistProfileCard {...playlist} />
          ))}
        </div>
      </div>
    );
  }
}
