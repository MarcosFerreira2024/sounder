import Button from "./ui/Button";
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
          roundedValue="sm"
          variant="confirm"
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </div>
    </ModalWrapper>
  );
}
