import { useState } from "react";
import { createPlaylist } from "../actions/playlists/createPlaylist";
import { useAppError } from "../contexts/ErrorContext";
import useUpload from "./useUpload";

function usePlaylistActions(onClose?: () => void) {
  const { setError } = useAppError();
  const [name, setName] = useState("");

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isVisibilityOpen, setVisibilityOpen] = useState(false);

  const { handleInputChange, handleUpload, isUploading, photo } = useUpload(
    async (file?: File) => {
      if (!name) return setError("Preencha o nome da playlist");
      await createPlaylist(name, file);
      onClose!();
    },
    onClose!,
    true,
  );

  return {
    name,
    setName,
    photo,
    isUploading,
    handleInputChange,
    handleUpload,
    isDeleteOpen,
    setDeleteOpen,
    isRenameOpen,
    setRenameOpen,
    isVisibilityOpen,
    setVisibilityOpen,
  };
}

export { usePlaylistActions };
