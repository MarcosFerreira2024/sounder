import { Heart, MoreVertical } from "lucide-react";
import { MediaInfoHeader } from "../MediaInfoHeader";
import Button from "../ui/Button";
import { usePermissions } from "../../hooks/usePermissions";
import { useParams } from "react-router-dom";
import { useFollow } from "../../hooks/useFollow";

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
  image: string;
  showModal: () => void;
}

export function ProfileHeader({
  title,
  subtitle,
  image,
  showModal,
}: ProfileHeaderProps) {
  const { userId } = useParams();
  const { isOwner, loading } = usePermissions();

  const { isFollowingUser, toggleFollow, wait } = useFollow(userId);

  if (loading) return null;

  return (
    <MediaInfoHeader subtitle={subtitle} title={title} image={image}>
      {isOwner(userId) ? (
        <MoreVertical onClick={showModal} className="text-opacity" />
      ) : (
        <Button
          onClick={toggleFollow}
          disabled={wait}
          icon={isFollowingUser ? <Heart fill="currentColor" /> : <Heart />}
          roundedValue="full"
          size="md"
          className={wait ? "cursor-wait" : "cursor-pointer"}
        />
      )}
    </MediaInfoHeader>
  );
}
