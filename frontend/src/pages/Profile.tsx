import { useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileAboutSection } from "../components/profile/ProfileAboutSection";
import { ProfilePublicPlaylistsSection } from "../components/profile/ProfilePublicPlaylistsSection";
import { UserConnectionsSection } from "../components/profile/UserConnectionsSection";
import useModalManager from "../hooks/useModalManager";
import ProfilePlaylistModal from "../components/profile/ProfilePlaylistModal";
import ProfileUpdateModal from "../components/profile/ProfileUpdateModal";
import { followersMock } from "../data/followersMock";
import { followingMock } from "../data/followingMock";

export function Profile() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  if (id) {
    return <div>{id}</div>;
  }

  const modals = useModalManager<"profile" | "playlist">();

  return (
    <MainLayout>
      {modals.activeModal === "playlist" && (
        <ProfilePlaylistModal onClose={modals.close} />
      )}
      {modals.activeModal === "profile" && (
        <ProfileUpdateModal onClose={modals.close} />
      )}

      <div className="flex  gap-4 ">
        <aside className="p-2 w-1/3 bg-neutral-900 border   border-neutral-800 rounded-2xl shadow-2xl flex  flex-col gap-2 ">
          <ProfileHeader
            showModal={() => modals.open("profile")}
            subtitle="Perfil"
            title="Joji"
            image="/artist-mock-photo.jpeg"
          />

          <ProfileAboutSection
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
            followerCount={6}
            followingCount={6}
            images={["/artist-mock-photo.jpeg"]}
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
          <div className="p-4 space-y-4 bg-neutral-950 border border-neutral-900 shadow-2xl flex-1 rounded-2xl overflow-y-auto">
            <ProfilePublicPlaylistsSection
              playlists={[
                {
                  playlistName: "Rock",
                  isPublic: true,
                },
              ]}
            />
            <UserConnectionsSection type="followers" data={followersMock} />
            <UserConnectionsSection type="following" data={followingMock} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
