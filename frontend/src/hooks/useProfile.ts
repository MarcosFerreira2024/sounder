import { useEffect, useState } from "react";
import getUserInfo from "../actions/user/getUserInfo";

type PublicUser = {
  id: string;
  name: string;
  image: string | null;
  about: string | null;
};

function useProfile(userId?: string) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      return setUser(null);
    }

    const load = async () => {
      const user = await getUserInfo(userId);
      setUser(user);
    };

    try {
      load();
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { loading, user };
}

export { useProfile, type PublicUser };
