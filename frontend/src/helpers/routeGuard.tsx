import type { JSX } from "react";
import { GuestRoute } from "../middlewares/GuestRoute";
import { ProtectedRoute } from "../middlewares/ProtectedRoute";

function routeGuard(element: JSX.Element, guard?: "auth" | "guest" | "public") {
  if (guard === "auth") {
    return <ProtectedRoute>{element}</ProtectedRoute>;
  }

  if (guard === "guest") {
    return <GuestRoute>{element}</GuestRoute>;
  }

  return element;
}

export default routeGuard;
