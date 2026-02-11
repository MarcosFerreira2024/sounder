import { Navigate } from "react-router-dom";
import { authClient } from "../libs/auth/auth";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  if (data?.session) return <Navigate to="/" replace />;

  return children;
}
