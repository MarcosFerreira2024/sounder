import { useState } from "react";
import { createPlaylist } from "../actions/playlists/createPlaylist";
import { useAppNotifications } from "../contexts/NotificationsContext";
import useUpload from "./useUpload";
import { updatePlaylist } from "../actions/playlists/updatePlaylist";
import { deletePlaylist } from "../actions/playlists/deletePlaylist";
import { useQueryClient } from "@tanstack/react-query";

function usePlaylistActions(onClose?: () => void) {
  const queryClient = useQueryClient();
  const { setNotification, handleAppNotificationsError } =
    useAppNotifications();
  const [name, setName] = useState("");

  const { handleInputChange, handleUpload, isUploading, photo } = useUpload(
    async (file?: File) => {
      if (!name) return setNotification("Preencha o nome da playlist");
      try {
        await createPlaylist(name, file);
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose!();
      } catch (error: any) {
        console.log(error);
        handleAppNotificationsError(error);
      }
    },
    onClose!,
    true,
  );

  async function deletePlaylistById(id: string) {
    setNotification("Excluindo playlist...");
    try {
      await deletePlaylist(id);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNotification("Playlist excluída com sucesso");
    } catch (error: any) {
      handleAppNotificationsError(error);
    }
  }

  async function rename(id: string, name: string, originalName?: string) {
    if (originalName && name === originalName) return;
    setNotification("Renomeando playlist...");
    try {
      await updatePlaylist({ name }, id);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNotification("Playlist renomeada com sucesso");
    } catch (error: any) {
      handleAppNotificationsError(error);
    }
  }

  async function changeVisibility(
    id: string,
    visibility: "PUBLIC" | "PRIVATE",
  ) {
    setNotification("Alterando visibilidade...");
    try {
      await updatePlaylist({ visibility }, id);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNotification("Visibilidade alterada com sucesso");
    } catch (error: any) {
      handleAppNotificationsError(error);
    }
  }

  return {
    name,
    setName,
    photo,
    isUploading,
    handleInputChange,
    handleUpload,
    deletePlaylistById,
    rename,
    changeVisibility,
  };
}

export { usePlaylistActions };
