import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useUserPlaylists } from "../hooks/useUserPlaylists";
import CollectionProfileCard from "../components/collection/CollectionProfileCard";

function UserPlaylists() {
  const { userId } = useParams();

  const { playlists } = useUserPlaylists(userId);

  return (
    <MainLayout>
      <div
        style={{ maxHeight: "calc(100dvh - 84px - 100px)" }}
        className="flex-1  scrollbar-hide lg:scrollbar-default overflow-y-auto py-4"
      >
        <div className="columns-[360px] pr-2 gap-4 w-full">
          {playlists && playlists.length > 0 ? (
            playlists.map((playlist, index) => {
              const isLarge = index % 2 === 0;

              return (
                <CollectionProfileCard
                  basePath="/"
                  key={playlist.id}
                  {...playlist}
                  imageClassName={`
                mb-4 break-inside-avoid
                ${isLarge ? "min-h-[400px] max-h-[400px]  " : "max-h-[500px] min-h-[500px]"}
                `}
                  overlay={true}
                />
              );
            })
          ) : (
            <>
              <div className="text-main">
                Esse usuario ainda nao possui playlists.
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserPlaylists;
