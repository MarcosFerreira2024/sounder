import type { ProfilePageProps } from "./MobileProfilePage";
import ProfileAside from "./ProfileAside";
import Container from "../ui/Container";
import ProfileContent from "./ProfileContent";

function DesktopProfilePage({
  user,
  playlists,
  followCount,
  followers,
  following,
  modals,
  isLoading,
  userId,
  emptyStateMessage,
  isOwner,
  rename,
  deletePlaylistById,
  changeVisibility,
  loadingProfile,
}: ProfilePageProps) {
  return (
    <div className="lg:flex gap-4  hidden">
      <Container loading={loadingProfile} className="xl:w-1/3  w-1/2">
        <ProfileAside
          loadingProfile={loadingProfile}
          user={user}
          followCount={followCount}
          modals={modals}
        />
      </Container>
      <Container loading={isLoading} className="xl:w-2/3 w-1/2">
        <div className="flex flex-col gap-10 p-4 bg-neutral-950 overflow-y-auto  rounded-2xl border border-neutral-800">
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

export default DesktopProfilePage;
