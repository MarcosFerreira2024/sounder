import { useState } from "react";
import useUpload from "../../hooks/useUpload";
import Button from "../ui/Button";
import Dropzone from "../ui/Dropzone";
import InputLabel from "../ui/InputLabel";
import { ModalWrapper } from "../ui/ModalWrapper";
import { createPlaylist } from "../../actions/playlists/createPlaylist";
import { useAppNotifications } from "../../contexts/NotificationsContext";
import { useQueryClient } from "@tanstack/react-query";

type AddPlaylistModalProps = {
  onClose: () => void;
};

function AddModal({ onClose }: AddPlaylistModalProps) {
  const queryClient = useQueryClient();
  const { setNotification, handleAppNotificationsError } =
    useAppNotifications();
  const { handleInputChange, handleUpload, isUploading, photo } = useUpload(
    async (file?: File | null) => {
      await onSubmit(name, file);

      return;
    },
    onClose,
    true,
  );

  const [name, setName] = useState("");

  const onSubmit = async (name: string, file?: File | null) => {
    if (!name) return setNotification("Preencha o nome da playlist");
    try {
      await createPlaylist(name, file);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      handleAppNotificationsError(error);
    } finally {
      onClose();
    }
  };

  return (
    <ModalWrapper className={`w-fit h-fit `} onClose={onClose}>
      <div className="flex gap-4">
        <Dropzone handleInputChange={handleInputChange} photo={photo} />

        <div className="flex flex-col flex-1 justify-between">
          <div className="flex gap-2 flex-col">
            <h1 className="text-main text-2xl">Criar Playlist</h1>
            <InputLabel
              showLabel={false}
              name="name"
              onChange={setName}
              placeholder="Digite o nome da playlist"
              type="text"
              text="Nome"
              value={name}
            />
          </div>
          <Button
            disabled={isUploading}
            onClick={handleUpload}
            size="sm"
            roundedValue="sm"
          >
            Enviar
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default AddModal;
