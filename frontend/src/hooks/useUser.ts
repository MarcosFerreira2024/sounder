import { useQuery } from "@tanstack/react-query";
import { useAppNotifications } from "../contexts/NotificationsContext";
import getUserInfo from "../actions/user/getUserInfo";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  about?: string;
  role?: "ADMIN" | "USER";
};

function useUser(userId?: string | null) {
  const { setNotification } = useAppNotifications();

  const { data, error, isLoading } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => {
      return getUserInfo(userId);
    },
    enabled: !!userId,

    staleTime: 1000 * 60,
  });

  if (error) setNotification(error.message);

  return {
    user: data,
    loading: isLoading,
  };
}

export { useUser };
