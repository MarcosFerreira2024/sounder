import { useCallback, useEffect } from "react";
import { useUser } from "./useUser";

function usePermissions() {
  const { user, loading } = useUser();

  const isAuthenticated = !loading && !!user;
  const isAdmin = !loading && user?.role === "ADMIN";

  const isOwner = useCallback(
    (resourceOwnerId?: string) => {
      if (loading) return false;
      if (!user?.id || !resourceOwnerId) return false;

      return user.id === resourceOwnerId;
    },
    [loading, user?.id],
  );

  return {
    loading,
    isAuthenticated,
    isAdmin,
    isOwner,
  };
}
export { usePermissions };
