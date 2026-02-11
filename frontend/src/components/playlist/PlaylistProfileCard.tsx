import { MediaCard } from "../ui/MediaCard";
import PlaylistMoreOptionsMenu from "./PlaylistMoreOptionsMenu";
import { useEffect, useState } from "react";
import { PlaylistOwnerModal } from "./PlaylistOwnerModal";
import { usePlaylistActions } from "../../hooks/usePlaylistActions";
import { useNavigate } from "react-router-dom";
import usePositionMenu from "../../hooks/usePositionMenu";

export type PlaylistProfileCardProps = {
  id: string;
  name: string;
  image?: string;
  visibility: "PUBLIC" | "PRIVATE";
  className?: string;
};

function PlaylistProfileCard({
  id,
  name,
  image,
  visibility,
  className,
}: PlaylistProfileCardProps) {
  const { position, toggle, close, isVisible } = usePositionMenu();

  const navigate = useNavigate();

  const {
    isDeleteOpen,
    setDeleteOpen,
    isRenameOpen,
    setRenameOpen,
    isVisibilityOpen,
    setVisibilityOpen,
  } = usePlaylistActions();

  return (
    <>
      <MediaCard
        onClick={() => navigate("/playlist/" + id)}
        className={className}
        title={name}
        image={image}
        showMenu={isVisible}
        toggleMenu={toggle}
        menu={
          <PlaylistMoreOptionsMenu
            position={position}
            playlistName={name}
            isPublic={visibility === "PUBLIC"}
            closeMenu={close}
            setDeleteOpen={setDeleteOpen}
            setRenameOpen={setRenameOpen}
            setVisibilityOpen={setVisibilityOpen}
          />
        }
      />
      <PlaylistOwnerModal
        playlistId={id}
        isDeleteOpen={isDeleteOpen}
        setDeleteOpen={setDeleteOpen}
        isRenameOpen={isRenameOpen}
        setRenameOpen={setRenameOpen}
        isVisibilityOpen={isVisibilityOpen}
        setVisibilityOpen={setVisibilityOpen}
        isPublic={visibility === "PUBLIC"}
        name={name}
      />
    </>
  );
}

export default PlaylistProfileCard;
