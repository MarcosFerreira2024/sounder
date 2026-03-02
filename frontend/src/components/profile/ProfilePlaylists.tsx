import { useParams } from "react-router-dom";
import type { Playlist } from "../../hooks/usePlaylist";
import CollectionProfileCard from "../collection/CollectionProfileCard";
import CarouselSection from "../ui/CarouselSection";

interface ProfilePlaylistsProps {
  playlists: Playlist[] | [];
}

export function ProfilePlaylists({ playlists }: ProfilePlaylistsProps) {
  const { userId } = useParams();

  return (
    <>
      <CarouselSection
        loading={false}
        to={`/profile/${userId}/playlists`}
        title="Playlists"
        items={playlists}
        mapItem={(playlist) => ({
          id: playlist.id,
          name: playlist.name,
          image: playlist.image ?? null,
          visibility: playlist.visibility,
        })}
        renderList={(mappedItems) =>
          mappedItems.map((item) => (
            <CollectionProfileCard
              key={item.id}
              {...item}
              basePath="playlist"
              canManage
              imageClassName="min-w-[328px] min-h-[216px] max-w-[328px] max-h-[216px]"
            />
          ))
        }
      />
    </>
  );
}
