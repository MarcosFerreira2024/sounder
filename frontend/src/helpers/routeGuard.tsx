import React from "react";
import { GuestRoute } from "../middlewares/GuestRoute";
import { ProtectedRoute } from "../middlewares/ProtectedRoute";

function routeGuard(
  Component: React.ComponentType,
  guard?: "auth" | "guest" | "public",
) {
  if (guard === "auth") {
    return (
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    );
  }

  if (guard === "guest") {
    return (
      <GuestRoute>
        <Component />
      </GuestRoute>
    );
  }

  return <Component />;
}

export default routeGuard;
