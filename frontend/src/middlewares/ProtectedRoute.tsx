import { Navigate } from "react-router-dom";
import { authClient } from "../libs/auth/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isPending, isRefetching } = authClient.useSession();

  if (isPending || isRefetching) return <div>Loading...</div>;

  if (!data || !data.session) return <Navigate to="/login" replace />;

  return children;
}
