import { MoreVertical } from "lucide-react";
import { MediaInfoHeader } from "../MediaInfoHeader";
import Button from "../ui/Button";

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
  return (
    <MediaInfoHeader subtitle={subtitle} title={title} image={image}>
      <MoreVertical onClick={showModal} className="text-opacity" />
    </MediaInfoHeader>
  );
}
