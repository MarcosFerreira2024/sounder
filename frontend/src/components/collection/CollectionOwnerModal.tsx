import { useCollectionContext } from "../../contexts/CollectionContext";
import { useCollectionActions } from "../../hooks/useCollectionAction";
import { ChangeVisibilityModal } from "../ChangeVisibilityModal";
import { DeleteModal } from "./DeleteModal";
import { RenameModal } from "./RenameModal";

export function CollectionOwnerModal() {
  const { collection } = useCollectionContext();
  const actions = useCollectionActions();

  if (!collection) return null;

  const { capabilities } = collection;

  return (
    <>
      {capabilities?.canDelete && actions.isDeleteOpen && (
        <DeleteModal
          title="Deletar"
          onConfirm={actions.remove}
          onCancel={() => actions.setDeleteOpen(false)}
        />
      )}

      {capabilities?.canRename && actions.isRenameOpen && (
        <RenameModal
          placeholder={"Digite um novo nome"}
          title="Renomear"
          initialValue={collection.name}
          onConfirm={actions.rename}
          onCancel={() => actions.setRenameOpen(false)}
        />
      )}

      {capabilities?.canChangeVisibility && actions.isVisibilityOpen && (
        <ChangeVisibilityModal
          isPublic={collection.visibility === "PUBLIC"}
          onConfirm={actions.toggleVisibility}
          onCancel={() => actions.setVisibilityOpen(false)}
        />
      )}
    </>
  );
}
