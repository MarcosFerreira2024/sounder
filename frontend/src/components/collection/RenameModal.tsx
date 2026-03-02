import { useState } from "react";
import { ModalWrapper } from "../ui/ModalWrapper";
import Button from "../ui/Button";
import Input from "../ui/Input";

type RenamePlaylistModalProps = {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  initialValue: string;
  title: string;
  placeholder: string;
};

export function RenameModal({
  initialValue,
  onConfirm,
  onCancel,
  title,
  placeholder,
}: RenamePlaylistModalProps) {
  const [name, setName] = useState(initialValue);

  return (
    <ModalWrapper title={title} onClose={onCancel}>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            roundedValue="sm"
            variant="opacity"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            roundedValue="sm"
            variant="confirm"
            onClick={() => onConfirm(name)}
          >
            Alterar Nome
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
