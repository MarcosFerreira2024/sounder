import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "../libs/auth/auth";
import getUserFollowers from "../actions/follow/getUserFollowers";
import getUserFollowing from "../actions/follow/getUserFollowing";
import { getFollowCount } from "../actions/follow/getFollowCount";
import { getFollowingStatus } from "../actions/follow/getFollowingStatus";
import { unfollow } from "../actions/follow/unfollow";
import { follow } from "../actions/follow/follow";
import { useAppNotifications } from "../contexts/NotificationsContext";

type Follow = {
  id: string;
  name: string;
  image: string;
};

type FollowCount = {
  followers: number;
  following: number;
};

export function useFollow(userId?: string | null) {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { handleAppNotificationsError, setNotification } =
    useAppNotifications();

  const followersQuery = useQuery<Follow[], Error>({
    queryKey: ["followers", userId],
    queryFn: () => getUserFollowers(userId!),
    enabled: !!userId,
  });

  const followingQuery = useQuery<Follow[], Error>({
    queryKey: ["following", userId],
    queryFn: () => getUserFollowing(userId!),
    enabled: !!userId,
  });

  const followCountQuery = useQuery<FollowCount, Error>({
    queryKey: ["followCount", userId],
    queryFn: () => getFollowCount(userId!),
    enabled: !!userId,
  });

  const isFollowingQuery = useQuery<boolean, Error>({
    queryKey: ["isFollowingUser", userId],
    queryFn: async () => {
      if (!userId || userId === session?.user.id) return false;
      return getFollowingStatus(userId);
    },
    enabled: !!userId && userId !== session?.user.id,
  });

  const toggleFollowMutation = useMutation({
    mutationFn: async () => {
      try {
        if (!userId) return;
        setNotification("Processando sua solicitação...");
        if (isFollowingQuery.data) {
          await unfollow(userId);
          setNotification("Você deixou de seguir este usuário.");
        } else {
          await follow(userId);
          setNotification("Usuário seguido com sucesso.");
        }
      } catch (error: any) {
        setNotification(error.message);
      }
    },
    onSuccess: async () => {
      if (!userId) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["followers", userId] }),
        queryClient.invalidateQueries({ queryKey: ["following", userId] }),
        queryClient.invalidateQueries({ queryKey: ["followCount", userId] }),
        queryClient.invalidateQueries({
          queryKey: ["isFollowingUser", userId],
        }),
      ]);
    },
    onError: (err: any) => {
      handleAppNotificationsError(err);
    },
  });

  const toggleFollow = () => toggleFollowMutation.mutate();

  const isLoading =
    followersQuery.isLoading ||
    followingQuery.isLoading ||
    followCountQuery.isLoading ||
    isFollowingQuery.isLoading;

  return {
    following: followingQuery.data ?? [],
    followers: followersQuery.data ?? [],
    isLoading,
    isFollowingUser: isFollowingQuery.data ?? false,
    toggleFollow,
    followCount: followCountQuery.data ?? { followers: 0, following: 0 },
  };
}
