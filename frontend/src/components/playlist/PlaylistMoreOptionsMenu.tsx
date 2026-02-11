import { AnimatePresence } from "framer-motion";
import { Lock, LockOpen, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";

type PlaylistMoreOptionsMenuProps = {
  playlistName: string;
  isPublic: boolean;
  closeMenu: () => void;
  setDeleteOpen: (isOpen: boolean) => void;
  setRenameOpen: (isOpen: boolean) => void;
  setVisibilityOpen: (isOpen: boolean) => void;
  position: {
    x: number;
    y: number;
  };
};

function PlaylistMoreOptionsMenu({
  isPublic,
  closeMenu,
  setDeleteOpen,
  position,
  setRenameOpen,
  setVisibilityOpen,
}: PlaylistMoreOptionsMenuProps) {
  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    closeMenu();
  };

  console.log(position);

  const options = [
    {
      action: () => setDeleteOpen(true),
      title: "Deletar Playlist",
      icon: <Trash className="w-4 h-4 text-main" />,
    },
    {
      action: () => setRenameOpen(true),
      title: "Renomear Playlist",
      icon: <Pencil className="w-4 h-4 text-main" />,
    },
    {
      action: () => setVisibilityOpen(true),
      title: "Mudar visibilidade",
      icon: isPublic ? (
        <LockOpen className="w-4 h-4 text-main" />
      ) : (
        <Lock className="w-4 h-4 text-main" />
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        style={{
          top: position.y + "%",
          left: position.x + "%",
        }}
        exit={{ opacity: 0 }}
        className="fixed z-100  shadow-md  bg-neutral-900 border border-neutral-800 group  rounded-2xl   w-56"
      >
        <div className="flex flex-col">
          {options.map((item) => {
            return (
              <button
                key={item.title}
                title={item.title}
                onClick={(e) => handleAction(e, item.action)}
                className="not-last:border-b first:rounded-t-2xl hover:opacity-80 last:rounded-b-2xl border-neutral-800  hover:bg-neutral-800 p-2"
              >
                <span
                  key={item.title}
                  title={item.title}
                  className="flex items-center gap-2 p-2   rounded-2xl text-sm "
                >
                  {item.icon}
                  <span className=" text-neutral-400 font-inter text-sm">
                    {item.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PlaylistMoreOptionsMenu;
