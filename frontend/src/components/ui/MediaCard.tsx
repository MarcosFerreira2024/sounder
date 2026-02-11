import { useEffect, useRef } from "react";
import { usePermissions } from "../../hooks/usePermissions";
import { useNavigate, useParams } from "react-router-dom";
import { MoreVerticalIcon } from "lucide-react";

export type MediaCardProps = {
  title: string;
  onClick?: (e: React.MouseEvent) => void;
  image?: string;
  showMenu?: boolean;
  menu?: React.ReactNode;
  className?: string;
  toggleMenu: (e: React.MouseEvent) => void;
};

function MediaCard({
  title,
  image,
  menu,
  onClick,
  toggleMenu,
  showMenu,
  className,
}: MediaCardProps) {
  const { isOwner, loading } = usePermissions();
  const { userId } = useParams();

  if (loading) return null;

  return (
    <>
      {showMenu && menu}

      <article
        onClick={onClick}
        className={`${className} flex group cursor-pointer flex-1 relative   overflow-hidden rounded-2xl border border-neutral-800`}
      >
        <div
          aria-hidden
          className="absolute bg-black/20 z-10  group-hover:bg-black/0 transition-colors w-full h-full"
        />

        <div className="flex justify-between absolute z-10 w-full p-2">
          <h2 className="text-neutral-200 group-hover:text-neutral-50 text-xl">
            {title}
          </h2>

          {isOwner(userId) && (
            <>
              <MoreVerticalIcon
                onClick={toggleMenu}
                className="text-neutral-100"
              />
            </>
          )}
        </div>

        <img
          className="object-cover w-full grayscale-50 group-hover:grayscale-0 "
          src={image ?? "/not-found.png"}
          alt={title}
        />
      </article>
    </>
  );
}
export { MediaCard };
