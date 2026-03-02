import { useEffect, useRef, useState } from "react";
import { ZodError } from "zod";

function useNotifications() {
  const [notification, setNotificationState] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const notificationCleanupTimeout = 2000; // 2s

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimeoutRef() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {
    clearTimeoutRef();

    if (!isHovering && notification) {
      timeoutRef.current = setTimeout(() => {
        clearNotification();
      }, notificationCleanupTimeout);
    }

    return clearTimeoutRef;
  }, [isHovering, notification]);

  function setNotification(message: string) {
    clearTimeoutRef();
    if (notification) {
      clearNotification();

      timeoutRef.current = setTimeout(() => {
        setNotificationState(message);
      }, 1000);

      return;
    }

    setNotificationState(message);
  }

  function clearNotification() {
    clearTimeoutRef();
    setNotificationState(null);
  }

  function handleAppNotificationsError(err: any) {
    if (err instanceof ZodError) {
      setNotification(err.issues[0].message);
      return;
    }

    if (err instanceof Error) {
      setNotification(err.message);
      return;
    }

    setNotification("Erro inesperado");
  }

  return {
    notification,
    setNotification,
    clearNotification,
    setIsHovering,
    handleAppNotificationsError,
  };
}

export { useNotifications };
