import { useState } from "react";
import { useCollectionContext } from "../contexts/CollectionContext";
import { useAppNotifications } from "../contexts/NotificationsContext";
import { useQueryClient } from "@tanstack/react-query";

export function useCollectionActions() {
  const { collection, actions } = useCollectionContext();
  const { setNotification } = useAppNotifications();

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isVisibilityOpen, setVisibilityOpen] = useState(false);

  const query = useQueryClient();

  const canRename = !!actions?.rename;
  const canDelete = !!actions?.remove;
  const canChangeVisibility = !!actions?.changeVisibility;

  async function rename(name: string) {
    if (!canRename) return;

    if (name === collection!.name) {
      setRenameOpen(false);
      return;
    }

    setNotification("Renomeando ...");

    try {
      await actions!.rename!(collection!.id, name);
      setNotification("Renomeado com sucesso");
      query.invalidateQueries({
        queryKey: ["collection", collection!.type, collection!.id],
      });
    } catch (error: any) {
      setNotification(error.message);
    } finally {
      setRenameOpen(false);
    }
  }

  async function remove() {
    if (!canDelete) return;
    setNotification("Removendo ...");

    try {
      await actions!.remove!(collection!.id);
      setNotification("Removido com sucesso");
    } catch (error: any) {
      setNotification(error.message);
    } finally {
      setDeleteOpen(false);
    }
  }

  async function toggleVisibility() {
    if (!canChangeVisibility) return;

    const visibility =
      collection!.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setNotification("Alterando visibilidade...");

    try {
      await actions!.changeVisibility!(visibility, collection!.id);
      setNotification("Visibilidade alterada com sucesso");
      query.invalidateQueries({
        queryKey: ["collection", collection!.type, collection!.id],
      });
    } catch (error: any) {
      setNotification(error.message);
    } finally {
      setVisibilityOpen(false);
    }
  }

  return {
    isDeleteOpen,
    setDeleteOpen,
    isRenameOpen,
    setRenameOpen,
    isVisibilityOpen,
    setVisibilityOpen,
    rename,
    remove,
    toggleVisibility,
  };
}
