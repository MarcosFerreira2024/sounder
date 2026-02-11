import { ModalWrapper } from "./ui/ModalWrapper";
import Button from "./ui/Button";
import Dropzone from "./ui/Dropzone";
import useUpload from "../hooks/useUpload";
import { updateUserProfilePicture } from "../actions/user/updateUserProfilePicture";

function UserProfilePictureModal({ onClose }: { onClose: () => void }) {
  const { handleInputChange, handleUpload, isUploading, photo } = useUpload(
    (file?: File | null) => updateUserProfilePicture(file),
    onClose,
  );

  return (
    <ModalWrapper className={`w-fit h-fit `} onClose={onClose}>
      <div className="flex gap-4">
        <Dropzone handleInputChange={handleInputChange} photo={photo} />

        <div className="flex flex-col flex-1 justify-between">
          <h1 className="text-main text-2xl">Alterar foto de Perfil</h1>
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

export default UserProfilePictureModal;
