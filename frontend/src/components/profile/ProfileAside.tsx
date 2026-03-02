import { ProfileHeader } from "./ProfileHeader";
import { ProfileAboutSection } from "./ProfileAboutSection";
import type useModalManager from "../../hooks/useModalManager";
import type { User } from "../../hooks/useUser";

type ProfileAsideProps = {
  user: User | undefined;
  followCount: {
    followers: number;
    following: number;
  };
  loadingProfile?: boolean;
  modals: ReturnType<typeof useModalManager<"profile" | "photo">>;
};

function ProfileAside({
  user,
  loadingProfile,
  followCount,
  modals,
}: ProfileAsideProps) {
  return (
    <aside className="flex flex-col gap-4">
      <ProfileHeader
        loadingProfile={loadingProfile}
        modals={modals}
        subtitle={`Profile`}
        title={user?.name ?? "User"}
        image={user?.image ?? "/not-found.svg"}
      />

      <ProfileAboutSection
        loadingProfile={loadingProfile}
        description={user?.about ?? ""}
        followCount={followCount}
      />
    </aside>
  );
}

export default ProfileAside;
