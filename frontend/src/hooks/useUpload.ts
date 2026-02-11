import { useEffect, useState } from "react";
import { useAppError } from "../contexts/ErrorContext";

function useUpload(
  action: (file?: File) => Promise<void>,
  onclose: () => void,
  isOptional?: boolean,
) {
  const [photo, setPhoto] = useState<File | null | undefined>(null);
  const [isUploading, setUploading] = useState(false);
  const { setError } = useAppError();

  const isValidImage = (file?: File | null): boolean => {
    if (!file) {
      setError("Selecione uma imagem");
      return false;
    }
    if (!file.type.includes("image")) {
      setError("Selecione uma imagem válida");
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
      onclose();
    } catch {
      setError("Erro ao enviar a imagem");
    } finally {
      setUploading(false);
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
