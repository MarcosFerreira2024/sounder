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
};

function PlaylistMoreOptionsMenu({
  isPublic,
  closeMenu,
  setDeleteOpen,
  setRenameOpen,
  setVisibilityOpen,
}: PlaylistMoreOptionsMenuProps) {
  const handleAction = (action: () => void) => {
    action();
    closeMenu();
  };

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
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-8 right-0 shadow-2xl  bg-neutral-900 border border-neutral-800  rounded-md  z-50 w-56"
      >
        <div className="flex flex-col">
          {options.map((item) => {
            return (
              <button
                title={item.title}
                onClick={() => handleAction(item.action)}
                className="not-last:border-b border-neutral-800 group  hover:bg-neutral-800 p-2"
              >
                <span
                  key={item.title}
                  title={item.title}
                  className="flex items-center gap-2 p-2 pointer-events-none   rounded-md text-sm "
                >
                  {item.icon}
                  <span className="group-hover:text-neutral-100 pointer-events-none text-neutral-400 font-inter text-sm">
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
