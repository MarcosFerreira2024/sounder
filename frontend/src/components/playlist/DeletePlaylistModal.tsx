import { ModalWrapper } from "../ui/ModalWrapper";

export function DeletePlaylistModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ModalWrapper
      subtitle="Essa ação não pode ser desfeita."
      title="Excluir playlist"
      onClose={onCancel}
    >
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-md hover:bg-zinc-700"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 text-sm font-medium text-red-500 rounded-md bg-red-500/20 hover:bg-red-500/30"
        >
          Excluir
        </button>
      </div>
    </ModalWrapper>
  );
}
