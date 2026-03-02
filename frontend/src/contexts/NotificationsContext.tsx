import { createContext, useContext } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { AnimatePresence } from "framer-motion";
import Notifcations from "../components/ui/Notifications";

type AppNotificationsContextType = ReturnType<typeof useNotifications>;

const AppNotificationsContext =
  createContext<AppNotificationsContextType | null>(null);

type AppNotificationsProviderProps = {
  children: React.ReactNode;
};

export function AppNotificationsProvider({
  children,
}: AppNotificationsProviderProps) {
  const {
    notification,
    clearNotification,
    handleAppNotificationsError,
    setNotification,
    setIsHovering,
  } = useNotifications();

  return (
    <AppNotificationsContext.Provider
      value={{
        clearNotification,
        notification,
        handleAppNotificationsError,
        setNotification,
        setIsHovering,
      }}
    >
      {children}

      <AnimatePresence>
        {notification && (
          <Notifcations
            setIsHovering={setIsHovering}
            message={notification}
            onClose={clearNotification}
          />
        )}
      </AnimatePresence>
    </AppNotificationsContext.Provider>
  );
}

export function useAppNotifications() {
  const context = useContext(AppNotificationsContext);

  if (!context) {
    throw new Error(
      "useAppNotifications must be used within an AppNotificationsProvider",
    );
  }

  return context;
}
