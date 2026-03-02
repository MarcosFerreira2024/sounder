import { Heart, MoreVertical } from "lucide-react";
import { MediaInfoHeader } from "../MediaInfoHeader";
import Button from "../ui/Button";
import { usePermissions } from "../../hooks/usePermissions";
import { useParams } from "react-router-dom";
import { useFollow } from "../../hooks/useFollow";
import type useModalManager from "../../hooks/useModalManager";
import { authClient } from "../../libs/auth/auth";

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
  image: string;
  loadingProfile?: boolean;
  modals: ReturnType<typeof useModalManager<"profile" | "photo">>;
}

export function ProfileHeader({
  title,
  subtitle,
  image,
  modals,
  loadingProfile,
}: ProfileHeaderProps) {
  const { userId } = useParams();
  const authenticatedUserId = authClient.useSession().data?.user.id;

  const { isOwner, loading } = usePermissions(authenticatedUserId);

  const { isFollowingUser, toggleFollow, isLoading } = useFollow(userId);

  return (
    <MediaInfoHeader
      loading={loadingProfile || loading}
      showChangePictureModal={() => modals.open("photo")}
      subtitle={subtitle}
      title={title}
      image={image}
    >
      {isOwner(userId) ? (
        <MoreVertical
          onClick={() => modals.open("profile")}
          className="text-opacity cursor-pointer"
        />
      ) : (
        <Button
          onClick={toggleFollow}
          disabled={isLoading}
          icon={
            isFollowingUser ? (
              <Heart className="md:w-6 w-4" fill="currentColor" />
            ) : (
              <Heart className="md:w-6 w-4" />
            )
          }
          roundedValue="full"
          size="md"
          className={isLoading ? "cursor-wait" : "cursor-pointer"}
        />
      )}
    </MediaInfoHeader>
  );
}
