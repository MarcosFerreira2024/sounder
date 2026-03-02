import Button from "../ui/Button";
import { ModalWrapper } from "../ui/ModalWrapper";

export function DeleteModal({
  onConfirm,
  onCancel,
  title,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) {
  return (
    <ModalWrapper
      subtitle="Essa ação não pode ser desfeita."
      title={title}
      onClose={onCancel}
    >
      <div className="flex justify-end gap-2 mt-6">
        <Button
          size="sm"
          variant="opacity"
          roundedValue="sm"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          roundedValue="sm"
          onClick={onConfirm}
        >
          Excluir
        </Button>
      </div>
    </ModalWrapper>
  );
}
