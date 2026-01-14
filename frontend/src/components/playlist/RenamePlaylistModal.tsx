import { useState } from "react";
import { ModalWrapper } from "../ui/ModalWrapper";

type RenamePlaylistModalProps = {
  initialValue: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
};

export function RenamePlaylistModal({
  initialValue,
  onConfirm,
  onCancel,
}: RenamePlaylistModalProps) {
  const [name, setName] = useState(initialValue);

  return (
    <ModalWrapper title="Renomear playlist" onClose={onCancel}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 mb-6 text-white"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-md hover:bg-zinc-700"
        >
          Cancelar
        </button>
        <button
          onClick={() => onConfirm(name)}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700"
        >
          Salvar
        </button>
      </div>
    </ModalWrapper>
  );
}
