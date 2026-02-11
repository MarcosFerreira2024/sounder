import { useEffect, useState } from "react";
import getUserInfo from "../actions/user/getUserInfo";

type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  about?: string;
  role?: "ADMIN" | "USER";
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserInfo = async () => {
    const user = await getUserInfo();
    setUser(user);
    return;
  };

  useEffect(() => {
    const load = async () => {
      await syncUserInfo();
    };
    try {
      load();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
}
