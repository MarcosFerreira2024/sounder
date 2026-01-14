import { MoreVerticalIcon, Music } from "lucide-react";
import { hexToRgba } from "../../helpers/hexToRgba";
import { useState, useRef, useEffect } from "react";
import PlaylistMoreOptionsMenu from "./PlaylistMoreOptionsMenu";

export type PlaylistProfileCardProps = {
  playlistName: string;
  playlistPhoto?: string;
  playlistColor?: string;
  isPublic: boolean;
};

function PlaylistProfileCard({
  playlistName,
  playlistPhoto,
  playlistColor = "#171717",
  isPublic,
}: PlaylistProfileCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const setDeleteOpen = (isOpen: boolean) =>
    console.log("Delete open:", isOpen);
  const setRenameOpen = (isOpen: boolean) =>
    console.log("Rename open:", isOpen);
  const setVisibilityOpen = (isOpen: boolean) =>
    console.log("Visibility open:", isOpen);

  return (
    <div
      style={{ backgroundColor: `${hexToRgba(playlistColor)}` }}
      className="min-w-[300px] min-h-[200px] max-w-[300px] max-h-[200px] hover:opacity-80 cursor-pointer  relative  border-neutral-800 border rounded-2xl "
      ref={menuRef}
    >
      <div className="flex justify-between p-2">
        <h1 className="text-main text-2xl text-shadow-md">{playlistName}</h1>

        <button onClick={handleMoreClick} className="relative z-20">
          <MoreVerticalIcon className="text-opacity" />
        </button>
      </div>
      {!playlistPhoto && (
        <Music
          size={36}
          className="text-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      )}

      <div className=" flex self-center justify-center">
        {playlistPhoto && (
          <img src={playlistPhoto} alt={playlistName} title={playlistName} />
        )}
      </div>

      {showMenu && (
        <PlaylistMoreOptionsMenu
          playlistName={playlistName}
          isPublic={isPublic}
          closeMenu={closeMenu}
          setDeleteOpen={setDeleteOpen}
          setRenameOpen={setRenameOpen}
          setVisibilityOpen={setVisibilityOpen}
        />
      )}
    </div>
  );
}

export default PlaylistProfileCard;
