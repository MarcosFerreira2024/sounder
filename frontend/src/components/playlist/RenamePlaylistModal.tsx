import { useState } from "react";
import { ModalWrapper } from "../ui/ModalWrapper";
import Button from "../ui/Button";
import Input from "../ui/Input";

type RenamePlaylistModalProps = {
  onConfirm: (name: string) => void;
  onCancel: () => void;
  initialValue: string;
};

export function RenamePlaylistModal({
  initialValue,
  onConfirm,
  onCancel,
}: RenamePlaylistModalProps) {
  const [name, setName] = useState(initialValue);

  return (
    <ModalWrapper title="Renomear playlist:" onClose={onCancel}>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite um novo nome para a playlist"
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
