import MainLayout from "../layouts/MainLayout";
import useModalManager from "../hooks/useModalManager";
import { useUserPlaylists } from "../hooks/useUserPlaylists";
import { useParams } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import { useFollow } from "../hooks/useFollow";
import { usePlaylistActions } from "../hooks/usePlaylistActions";
import MobileProfilePage from "../components/profile/MobileProfilePage";
import DesktopProfilePage from "../components/profile/DesktopProfilePage";
import ProfileModals from "../components/profile/ProfileModals";
import { useUser } from "../hooks/useUser";
import { authClient } from "../libs/auth/auth";

export function Profile() {
  const { userId } = useParams();

  const { user, loading: loadingProfile } = useUser(userId);

  const authenticatedUserId = authClient.useSession().data?.user.id;
  const { isOwner, loading: permissionsLoading } =
    usePermissions(authenticatedUserId);

  const { playlists, loading: playlistLoading } = useUserPlaylists(userId);
  const {
    followers,
    following,
    isLoading: followLoading,
    followCount,
  } = useFollow(userId);

  const { changeVisibility, deletePlaylistById, rename } = usePlaylistActions();

  const modals = useModalManager<"profile" | "photo">();

  const emptyStateMessage = () => {
    if (!playlists.length && !following.length && !followers.length) {
      return "Usuario ainda nao possui nenhum dado sem seu perfil";
    }
  };

  const props = {
    user,
    changeVisibility,
    deletePlaylistById,
    rename,
    modals,
    playlists,
    followCount,
    followers,
    following,
    isLoading: playlistLoading || followLoading || permissionsLoading,
    loadingProfile,
    userId: userId!,
    emptyStateMessage: emptyStateMessage(),
    isOwner,
  };

  return (
    <MainLayout>
      <ProfileModals {...props} />
      <MobileProfilePage {...props} />
      <DesktopProfilePage {...props} />
    </MainLayout>
  );
}

export default Profile;
