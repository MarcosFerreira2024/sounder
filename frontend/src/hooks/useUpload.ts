import { useEffect, useState } from "react";
import { useAppNotifications } from "../contexts/NotificationsContext";
function useUpload(
  action: (file?: File) => Promise<void>,
  onclose?: () => void,
  isOptional?: boolean,
) {
  const [photo, setPhoto] = useState<File | null | undefined>(null);
  const [isUploading, setUploading] = useState(false);
  const { setNotification, handleAppNotificationsError } =
    useAppNotifications();

  const isValidImage = (file?: File | null): boolean => {
    if (!file) {
      setNotification("Selecione uma imagem");
      return false;
    }
    if (!file.type.includes("image")) {
      setNotification("Selecione uma imagem válida");
      return false;
    }
    return true;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (!isValidImage(file)) return;
    setPhoto(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!isValidImage(file)) return;
    setPhoto(file);
  };

  const handleUpload = async () => {
    if (!isOptional && (!photo || !isValidImage(photo))) return;

    setUploading(true);
    try {
      await action(photo ?? undefined);
    } catch (error: any) {
      handleAppNotificationsError(error);
    } finally {
      setUploading(false);
      onclose?.();
    }
  };

  useEffect(() => {
    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
      handleDrop(e);
    };
    const handleWindowDragOver = (e: DragEvent) => e.preventDefault();

    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragover", handleWindowDragOver);

    return () => {
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragover", handleWindowDragOver);
    };
  }, []);

  return {
    photo,
    setPhoto,
    isUploading,
    handleDrop,
    handleInputChange,
    handleUpload,
  };
}

export default useUpload;
