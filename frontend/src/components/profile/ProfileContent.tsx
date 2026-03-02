import CarouselSection from "../ui/CarouselSection";
import type { Playlist } from "../../hooks/usePlaylist";
import CollectionProfileCard from "../collection/CollectionProfileCard";
import { UserConnectionsSection } from "./UserConnectionsSection";

type ProfileContentProps = {
  playlists: Playlist[];
  followers: { id: string; name: string; image: string }[] | null;
  following: { id: string; name: string; image: string }[] | null;
  isLoading: boolean;
  userId: string;
  emptyMessage?: string | null;
  isOwner: (userId: string) => boolean;
  rename: (playlistId: string, newName: string) => void;
  deletePlaylistById: (playlistId: string) => void;
  changeVisibility: (id: string, visibility: "PUBLIC" | "PRIVATE") => void;
};

function ProfileContent({
  playlists,
  followers,
  following,
  isLoading,
  userId,
  emptyMessage,
  isOwner,
  rename,
  deletePlaylistById,
  changeVisibility,
}: ProfileContentProps) {
  if (isLoading)
    return (
      <div>
        <h1 className="text-xl text-opacity">
          Aguarde enquanto carregamos os dados
        </h1>
      </div>
    );

  if (emptyMessage) {
    return (
      <div>
        <h1 className="text-xl text-opacity">{emptyMessage}</h1>
      </div>
    );
  }

  return (
    <>
      <CarouselSection
        to={`/profile/${userId}/playlists`}
        title="Playlists"
        items={playlists}
        loading={isLoading}
        mapItem={(playlist) => ({
          id: playlist.id,
          name: playlist.name,
          image: playlist.image ?? null,
          visibility: playlist.visibility,
          overlay: true,

          imageClassName:
            "lg:min-w-90 lg:min-h-50 lg:max-w-90 lg:max-h-50 min-w-70 min-h-40 max-w-70 max-h-40",
          className: "rounded-2xl h-fit",
        })}
        renderList={(mappedItems) =>
          mappedItems.map((item) => {
            return (
              <CollectionProfileCard
                basePath={`profile/${userId}/playlist`}
                canManage={isOwner(userId)}
                onRename={rename}
                onDelete={deletePlaylistById}
                onChangeVisibility={changeVisibility}
                key={item.id}
                {...item}
              />
            );
          })
        }
      />
      <UserConnectionsSection
        isLoading={isLoading}
        type="followers"
        data={followers}
      />
      <UserConnectionsSection
        isLoading={isLoading}
        type="following"
        data={following}
      />
      {emptyMessage && <p className="text-neutral-400">{emptyMessage}</p>}
    </>
  );
}

export default ProfileContent;
