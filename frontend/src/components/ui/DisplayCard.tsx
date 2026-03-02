import React from "react";
import { MoreVerticalIcon } from "lucide-react";
import Image from "./Image";
import { usePermissions } from "../../hooks/usePermissions";
import { Link, useParams } from "react-router-dom";
import { authClient } from "../../libs/auth/auth";
import { DisplayCardSkeleton } from "./DisplayCardSkeleton";

export type DisplayCardProps = {
  title?: string;
  image?: string | null;
  to: string;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
  grayscaleHover?: boolean;
  menu?: React.ReactNode;
  showMenu?: boolean;
  loading?: boolean;
  toggleMenu?: (e: React.MouseEvent) => void;
};

export function DisplayCard({
  title,
  image,
  className,
  to,
  imageClassName,
  titleClassName,
  overlay,
  overlayClassName,
  loading,
  grayscaleHover = true,
  menu,
  showMenu,
  toggleMenu,
}: DisplayCardProps) {
  const { userId } = useParams();
  const authenticatedUserId = authClient.useSession().data?.user.id;

  const { isOwner, loading: loadingPermissions } =
    usePermissions(authenticatedUserId);

  if (loading || loadingPermissions)
    return (
      <DisplayCardSkeleton
        className={className}
        imageClassName={imageClassName}
        titleClassName={titleClassName}
        overlay={overlay}
        overlayClassName={overlayClassName}
        showMenu={showMenu}
      />
    );

  const canShowMenu = isOwner(userId);

  return (
    <>
      {showMenu && menu}

      <Link
        to={to}
        className={`
          relative group cursor-pointer snap-start
          hover:opacity-90
          flex items-center
          flex-col
          outline-none 
          group

          ${className}
        `}
      >
        {overlay && (
          <div
            aria-hidden
            className={`
              absolute inset-0 z-10 transition-colors
              ${overlayClassName}
            `}
          />
        )}

        {((title && overlay) || (canShowMenu && toggleMenu)) && (
          <div className="absolute z-20 w-full flex justify-between p-2">
            {title && (
              <h2
                className={` font-inter text-shadow-md
                  text-neutral-300 group-hover:text-neutral-50
                  ${titleClassName}
                `}
              >
                {title}
              </h2>
            )}

            {canShowMenu && toggleMenu && (
              <MoreVerticalIcon
                onClick={toggleMenu}
                className="text-neutral-100"
              />
            )}
          </div>
        )}

        <Image
          src={image ?? "/not-found.svg"}
          alt={title ?? "Imagem não encontrada"}
          className={`
            object-cover w-full
            overflow-hidden
            rounded-2xl
            border border-neutral-800 shadow-md
            
            group-focus-visible:ring-2
            group-focus-visible:ring-neutral-600
            ${grayscaleHover ? "grayscale-50 group-hover:grayscale-0" : ""}
            ${imageClassName}
          `}
        />

        {title && !overlay && (
          <h2
            className={`text-base text-center mt-2 font-inter text-neutral-400 ${titleClassName}`}
          >
            {title}
          </h2>
        )}
      </Link>
    </>
  );
}
