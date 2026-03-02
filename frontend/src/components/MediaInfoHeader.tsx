import { usePermissions } from "../hooks/usePermissions";
import { authClient } from "../libs/auth/auth";
import Image from "./ui/Image";
import { useParams } from "react-router-dom";
import { MediaInfoHeaderSkeleton } from "./ui/MediaInfoSkeleton";

type MediaHeaderProps = {
  image: string;
  title: string;
  subtitle: string | null | undefined;
  children?: React.ReactNode;
  showChangePictureModal: () => void;
  loading?: boolean;
};

export function MediaInfoHeader({
  image,
  title,
  subtitle,
  children,
  loading,
  showChangePictureModal,
}: MediaHeaderProps) {
  const userId = useParams().userId;
  const authenticatedUserId = authClient.useSession().data?.user.id;

  const { isOwner } = usePermissions(authenticatedUserId);

  if (loading)
    return (
      <MediaInfoHeaderSkeleton showActions={isOwner(userId) ? true : false} />
    );

  return (
    <div className="py-2 flex justify-between h-full min-h-24.5 max-h-24.5 items-center px-4 border border-neutral-800 bg-neutral-950 w-full rounded-2xl">
      <div className="flex items-start gap-2">
        <Image
          src={image || "/not-found.svg"}
          onClick={isOwner(userId) ? showChangePictureModal : undefined}
          className="rounded-full border object-cover  border-neutral-900 w-14 h-14 md:w-18 md:h-18"
          alt={title}
        />

        <div className="flex flex-col font-inter">
          <h1 className="text-neutral-100 text-xl md:text-2xl">{title}</h1>
          <p className="text-neutral-400 text-sm md:text-base">{subtitle}</p>
        </div>
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
