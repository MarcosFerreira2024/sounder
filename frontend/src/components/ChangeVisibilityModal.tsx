import { ModalWrapper } from "./ui/ModalWrapper";

type ChangeVisibilityModalProps = {
  isPublic: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ChangeVisibilityModal({
  isPublic,
  onConfirm,
  onCancel,
}: ChangeVisibilityModalProps) {
  return (
    <ModalWrapper
      subtitle={`Deseja alterar a visibilidade da playlist para
        ${isPublic ? "Privada" : "Pública"}?`}
      title="Alterar visibilidade"
      onClose={onCancel}
    >
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-md hover:bg-zinc-700"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700"
        >
          Confirmar
        </button>
      </div>
    </ModalWrapper>
  );
}
