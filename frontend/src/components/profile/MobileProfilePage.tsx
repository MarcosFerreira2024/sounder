import Container from "../ui/Container";
import ProfileContent from "./ProfileContent";
import ProfileAside from "./ProfileAside";
import type useModalManager from "../../hooks/useModalManager";
import type { Playlist } from "../../hooks/usePlaylist";
import type { User } from "../../hooks/useUser";

export type ProfilePageProps = {
  user: User | undefined;
  playlists: Playlist[];
  followCount: { followers: number; following: number };
  isLoading: boolean;
  userId: string;
  emptyStateMessage: string | undefined;
  isOwner: (userId: string) => boolean;
  rename: (id: string, name: string) => void;
  deletePlaylistById: (id: string) => void;
  changeVisibility: (
    id: string,
    visibility: "PUBLIC" | "PRIVATE",
  ) => Promise<void>;
  modals: ReturnType<typeof useModalManager<"profile" | "photo">>;
  followers: { id: string; name: string; image: string }[] | null;
  following: { id: string; name: string; image: string }[] | null;
  loadingProfile: boolean;
};

function MobileProfilePage({
  user,
  playlists,
  followCount,
  followers,
  following,
  modals,
  isLoading,
  userId,
  loadingProfile,
  emptyStateMessage,
  isOwner,
  rename,
  deletePlaylistById,
  changeVisibility,
}: ProfilePageProps) {
  return (
    <div className="lg:hidden ">
      <Container>
        <div className="flex flex-col gap-10 p-4 bg-neutral-950 overflow-y-auto scrollbar-hide  rounded-2xl border border-neutral-800">
          <ProfileAside
            loadingProfile={loadingProfile}
            user={user}
            followCount={followCount}
            modals={modals}
          />
          <ProfileContent
            playlists={playlists}
            followers={followers}
            following={following}
            isLoading={isLoading}
            userId={userId}
            emptyMessage={emptyStateMessage}
            isOwner={isOwner}
            rename={rename}
            deletePlaylistById={deletePlaylistById}
            changeVisibility={changeVisibility}
          />
        </div>
      </Container>
    </div>
  );
}

export default MobileProfilePage;
