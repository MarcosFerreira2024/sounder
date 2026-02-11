import MainLayout from "../layouts/MainLayout";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileAboutSection } from "../components/profile/ProfileAboutSection";
import { UserConnectionsSection } from "../components/profile/UserConnectionsSection";
import useModalManager from "../hooks/useModalManager";
import { ProfilePlaylists } from "../components/profile/ProfilePlaylists";
import { useUserPlaylists } from "../hooks/useUserPlaylists";
import { useParams } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import { useProfile } from "../hooks/useProfile";
import UserUpdateModal from "../components/profile/ProfileUpdateModal";
import UserProfilePictureModal from "../components/UserProfilePictureModal";
import { useFollow } from "../hooks/useFollow";

export function Profile() {
  const { userId } = useParams();

  const { isOwner } = usePermissions();

  const { user } = useProfile(userId);

  const { playlists } = useUserPlaylists(userId);
  const { followers, following, isLoading, followCount } = useFollow(userId);

  const modals = useModalManager<"profile" | "photo">();

  const emptyStateMessage = () => {
    if (!playlists && !following && !followers)
      return "Esse usuario ainda nao possui playlists, followers e following.";
  };

  return (
    <MainLayout>
      {modals.activeModal === "profile" && isOwner(userId) && (
        <UserUpdateModal
          onClose={modals.close}
          photo={user?.image ?? "/not-found.png"}
          open={modals.open}
        />
      )}

      {modals.activeModal === "photo" && (
        <UserProfilePictureModal onClose={modals.close} />
      )}

      <div className="flex  gap-4 ">
        <aside className="p-2 w-1/3 bg-neutral-900 border   border-neutral-800 rounded-2xl shadow-md flex  flex-col gap-2 ">
          <ProfileHeader
            showModal={() => modals.open("profile")}
            subtitle={`Profile`}
            title={user?.name ?? "User"}
            image={user?.image ?? "/not-found.png"}
          />

          <ProfileAboutSection
            description={user?.about ?? ""}
            followCount={followCount}
          />
        </aside>
        <div
          style={{
            minHeight: "calc(100dvh - 84px - 100px)",
            maxHeight: "calc(100dvh - 84px - 100px)",
          }}
          className="
        w-2/3
        min-h-150
        bg-neutral-900
        rounded-2xl
        border border-neutral-800
        grid gap-2
        p-2
        overflow-hidden
      "
        >
          <div className="p-4 flex flex-col gap-y-10 bg-neutral-950 border border-neutral-800 shadow-md flex-1 rounded-2xl overflow-y-auto">
            <ProfilePlaylists playlists={playlists} />
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
            {emptyStateMessage() && (
              <p className="text-neutral-400">{emptyStateMessage()}</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
