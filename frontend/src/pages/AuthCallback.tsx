import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../libs/auth/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function finalizeLogin() {
      try {
        const session = await authClient.getSession();

        if (!mounted) return;

        if (!session) {
          navigate("/login");
          return;
        }

        if (session) {
          console.log("Session in AuthCallback:", session);
          window.location.href = "http://localhost:5173/";
        }
      } catch {
        navigate("/login");
      }
    }

    finalizeLogin();

    return () => {
      mounted = false;
    };
  }, []);

  return <p>Finalizando login...</p>;
}
