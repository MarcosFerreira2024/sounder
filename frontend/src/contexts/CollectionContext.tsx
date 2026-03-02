import { createContext, useContext } from "react";
import { useCollection, type Collection } from "../hooks/useCollection";
import { updatePlaylist } from "../actions/playlists/updatePlaylist";
import { deletePlaylist } from "../actions/playlists/deletePlaylist";
import { useNavigate } from "react-router-dom";
import { useAppNotifications } from "./NotificationsContext";

export type CollectionActions = {
  rename?: (id: string, name: string) => Promise<void>;
  remove?: (id: string) => Promise<void>;
  changeVisibility?: (
    visibility: "PUBLIC" | "PRIVATE",
    id: string,
  ) => Promise<void>;
};

type CollectionContextType = {
  collection: Collection | null;
  loading: boolean;
  error: Error | null;
  actions?: CollectionActions;
  collectionType: "album" | "playlist" | "recommendation" | "music";
};

const CollectionContext = createContext<CollectionContextType | null>(null);

type CollectionProviderProps = {
  children: React.ReactNode;
  id?: string;
  collectionType: "album" | "playlist" | "recommendation" | "music";
};

export function CollectionProvider({
  children,
  id,
  collectionType,
}: CollectionProviderProps) {
  const { collection, loading, error } = useCollection(collectionType, id);
  const navigate = useNavigate();
  const { setNotification } = useAppNotifications();

  let actions: CollectionActions | undefined;

  if (collectionType === "playlist") {
    actions = {
      rename: async (id: string, name: string) => {
        try {
          await updatePlaylist({ name }, id);
        } catch (error: any) {
          setNotification(error.message);
        }
      },

      remove: async (id: string) => {
        try {
          await deletePlaylist(id);
          navigate("/profile");
        } catch (error: any) {
          setNotification(error.message);
        }
      },

      changeVisibility: async (
        visibility: "PUBLIC" | "PRIVATE",
        id: string,
      ) => {
        try {
          await updatePlaylist({ visibility }, id);
        } catch (error: any) {
          setNotification(error.message);
        }
      },
    };
  }

  return (
    <CollectionContext.Provider
      value={{
        collection,
        loading,
        error: error as Error | null,
        actions,
        collectionType,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionContext() {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider",
    );
  }

  return context;
}
