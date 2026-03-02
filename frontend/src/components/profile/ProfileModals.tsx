import type useModalManager from "../../hooks/useModalManager";
import UserUpdateModal from "./ProfileUpdateModal";
import UserProfilePictureModal from "../UserProfilePictureModal";
import type { User } from "../../hooks/useUser";

type ProfileModalProps = {
  modals: ReturnType<typeof useModalManager<"profile" | "photo">>;
  user: User | undefined;
  isOwner: (userId: string) => boolean;
  userId: string;
};

function ProfileModals({ modals, user, isOwner, userId }: ProfileModalProps) {
  return (
    <>
      {modals.activeModal === "profile" && isOwner(userId) && (
        <UserUpdateModal
          onClose={modals.close}
          photo={user?.image ?? "/not-found.svg"}
          open={modals.open}
        />
      )}

      {modals.activeModal === "photo" && (
        <UserProfilePictureModal onClose={modals.close} />
      )}
    </>
  );
}

export default ProfileModals;
