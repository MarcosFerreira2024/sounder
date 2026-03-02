import { useCallback } from "react";
import { useUser } from "./useUser";

function usePermissions(targetUserId?: string) {
  const { user, loading } = useUser(targetUserId);

  const isAuthenticated = !loading && !!user;
  const isAdmin = !loading && user?.role === "ADMIN";

  const isOwner = useCallback(
    (resourceOwnerId?: string | null) => {
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
