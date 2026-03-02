import usePositionMenu from "../../hooks/usePositionMenu";
import useModalManager from "../../hooks/useModalManager";
import { DisplayCard } from "../ui/DisplayCard";
import CollectionMoreOptionsMenu from "../collection/CollectionMoreOptionsMenu";
import { ChangeVisibilityModal } from "../ChangeVisibilityModal";
import { DeleteModal } from "./DeleteModal";
import { RenameModal } from "./RenameModal";
import { useQueryClient } from "@tanstack/react-query";

export type CollectionProfileCardProps = {
  id: string;
  name: string;
  image?: string;
  visibility: "PUBLIC" | "PRIVATE";
  basePath: string;

  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
  grayscaleHover?: boolean;

  canManage?: boolean;

  onDelete?: (id: string) => void;
  onRename?: (id: string, name: string, originalName?: string) => void;
  onChangeVisibility?: (id: string, visibility: "PUBLIC" | "PRIVATE") => void;
};

function CollectionProfileCard({
  id,
  name,
  image,
  visibility,
  basePath,
  grayscaleHover,
  imageClassName,
  overlay,
  overlayClassName,
  className,
  canManage = false,

  onDelete,
  onRename,
  onChangeVisibility,
}: CollectionProfileCardProps) {
  const { position, toggle, close, isVisible } = usePositionMenu();
  const modal = useModalManager<"delete" | "rename" | "visibility">();
  const query = useQueryClient();
  return (
    <>
      <DisplayCard
        to={`/${basePath}/${id}`}
        className={className}
        imageClassName={imageClassName}
        grayscaleHover={grayscaleHover}
        overlay={overlay}
        overlayClassName={overlayClassName}
        title={name}
        image={image}
        showMenu={canManage && isVisible}
        toggleMenu={canManage ? toggle : undefined}
        menu={
          canManage ? (
            <CollectionMoreOptionsMenu
              position={position}
              name={name}
              isPublic={visibility === "PUBLIC"}
              closeMenu={close}
              setDeleteOpen={() => modal.open("delete")}
              setRenameOpen={() => modal.open("rename")}
              setVisibilityOpen={() => modal.open("visibility")}
            />
          ) : undefined
        }
      />

      {modal.isOpen("delete") && (
        <DeleteModal
          title="Excluir"
          onCancel={modal.close}
          onConfirm={async () => {
            await onDelete?.(id);
            modal.close();
            query.invalidateQueries({
              queryKey: ["collection", "playlist", id],
            });
            query.invalidateQueries({
              queryKey: ["playlists"],
            });
          }}
        />
      )}

      {modal.isOpen("rename") && (
        <RenameModal
          title="Renomear"
          placeholder="Novo nome"
          initialValue={name}
          onCancel={modal.close}
          onConfirm={async (newName) => {
            await onRename?.(id, newName, name);
            modal.close();
            query.invalidateQueries({
              queryKey: ["collection", "playlist", id],
            });
            query.invalidateQueries({
              queryKey: ["playlists"],
            });
          }}
        />
      )}

      {modal.isOpen("visibility") && (
        <ChangeVisibilityModal
          isPublic={visibility === "PUBLIC"}
          onCancel={modal.close}
          onConfirm={async () => {
            await onChangeVisibility?.(
              id,
              visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC",
            );
            modal.close();
            query.invalidateQueries({
              queryKey: ["collection", "playlist", id],
            });
            query.invalidateQueries({
              queryKey: ["playlists"],
            });
          }}
        />
      )}
    </>
  );
}

export default CollectionProfileCard;
