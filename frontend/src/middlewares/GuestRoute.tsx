import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../contexts/AuthContext";
import { GlobalLoader } from "../components/ui/GlobalLoader";

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const session = useAuthProvider();

  if (!session || session.isPending) return <GlobalLoader />;

  if (session.data) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
