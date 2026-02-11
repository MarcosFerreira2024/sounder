import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useUserPlaylists } from "../hooks/useUserPlaylists";
import PlaylistProfileCard from "../components/playlist/PlaylistProfileCard";

function UserPlaylists() {
  const { userId } = useParams();

  const { playlists } = useUserPlaylists(userId);

  return (
    <MainLayout>
      <div
        style={{ maxHeight: "calc(100dvh - 84px - 100px)" }}
        className="flex-1  overflow-y-auto py-4"
      >
        <div className="columns-[328px] gap-4 w-full">
          {playlists && playlists.length > 0 ? (
            playlists.map((playlist, index) => {
              const isLarge = index % 4 === 0;

              return (
                <PlaylistProfileCard
                  key={playlist.id}
                  {...playlist}
                  className={`
                mb-4 break-inside-avoid
                ${isLarge ? "min-h-[360px] max-h-[360px]" : "max-h-[500px] min-h-[500px]"}
                `}
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
