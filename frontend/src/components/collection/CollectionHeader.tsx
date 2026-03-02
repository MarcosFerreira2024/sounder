import { MoreVertical } from "lucide-react";
import usePositionMenu from "../../hooks/usePositionMenu";
import CollectionMoreOptionsMenu from "./CollectionMoreOptionsMenu";
import CollectionHeaderSkeleton from "./CollectionHeaderSkeleton";
import { useCollectionContext } from "../../contexts/CollectionContext";
import { useCollectionActions } from "../../hooks/useCollectionAction";
import { ChangeVisibilityModal } from "../ChangeVisibilityModal";
import { DeleteModal } from "./DeleteModal";
import { RenameModal } from "./RenameModal";
import { MediaInfoHeader } from "../MediaInfoHeader";

export function CollectionHeader() {
  const { collection, loading } = useCollectionContext();
  const actions = useCollectionActions();
  const { close, isVisible, position, toggle } = usePositionMenu();

  if (loading || !collection) {
    return (
      <CollectionHeaderSkeleton data={collection?.tracks} isLoading={loading} />
    );
  }

  const { capabilities } = collection;

  const typeLabels = {
    playlist: {
      renameTitle: "Renomear playlist",
      renamePlaceholder: "Novo nome da playlist",
      deleteTitle: "Excluir playlist",
    },
    album: {
      renameTitle: "Renomear álbum",
      renamePlaceholder: "Novo nome do álbum",
      deleteTitle: "Excluir álbum",
    },
  } as const;

  const labels = typeLabels[collection.type as keyof typeof typeLabels];

  return (
    <>
      <MediaInfoHeader
        showChangePictureModal={() => {}}
        key={collection.id}
        image={collection.image}
        title={collection.name}
        subtitle={
          collection.type !== "music"
            ? collection.tracks?.length
              ? `${collection.tracks.length === 1 ? "1 música" : `${collection.tracks.length} musicas`} `
              : "Sem músicas"
            : "Música"
        }
      >
        {capabilities?.canRename && (
          <div className="relative">
            <MoreVertical
              onClick={(e: React.MouseEvent) => toggle(e)}
              className="cursor-pointer text-opacity"
            />

            {isVisible && (
              <CollectionMoreOptionsMenu
                closeMenu={close}
                position={position}
                setRenameOpen={() => actions.setRenameOpen(true)}
                setDeleteOpen={() => actions.setDeleteOpen(true)}
                setVisibilityOpen={() => actions.setVisibilityOpen(true)}
                isPublic={collection.visibility === "PUBLIC"}
                name={collection.name}
              />
            )}
          </div>
        )}
      </MediaInfoHeader>
      {actions.isRenameOpen && (
        <RenameModal
          placeholder={labels.renamePlaceholder}
          initialValue={collection.name}
          title={labels.renameTitle}
          onCancel={() => actions.setRenameOpen(false)}
          onConfirm={actions.rename}
        />
      )}

      {actions.isDeleteOpen && (
        <DeleteModal
          title={labels.deleteTitle}
          onCancel={() => actions.setDeleteOpen(false)}
          onConfirm={actions.remove}
        />
      )}

      {actions.isVisibilityOpen && (
        <ChangeVisibilityModal
          onCancel={() => actions.setVisibilityOpen(false)}
          onConfirm={actions.toggleVisibility}
          isPublic={collection.visibility === "PUBLIC"}
        />
      )}
    </>
  );
}
