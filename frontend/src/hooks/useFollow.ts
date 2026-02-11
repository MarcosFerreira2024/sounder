import { useEffect, useState } from "react";
import getUserFollowers from "../actions/follow/getUserFollowers";
import getUserFollowing from "../actions/follow/getUserFollowing";
import { authClient } from "../libs/auth/auth";
import { getFollowingStatus } from "../actions/follow/getFollowingStatus";
import { unfollow } from "../actions/follow/unfollow";
import { follow } from "../actions/follow/follow";
import { getFollowCount } from "../actions/follow/getFollowCount";

function useFollow(userId?: string) {
  const [following, setFollowing] = useState<Follow[] | null>(null);
  const [followers, setFollowers] = useState<Follow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [followCount, setFollowCount] = useState({
    followers: 0,
    following: 0,
  });

  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const [wait, setWait] = useState(false);

  const { data } = authClient.useSession();

  type Follow = {
    id: string;
    name: string;
    image: string;
  };

  const isFollowing = async () => {
    if (userId !== data?.user.id) {
      if (!userId) return;
      return await getFollowingStatus(userId);
    }
  };

  useEffect(() => {
    if (!wait) return;

    const timer = setTimeout(() => setWait(false), 500);
    return () => clearTimeout(timer);
  }, [wait]);

  const toggleFollow = async () => {
    if (!userId) return;
    if (wait) return;

    if (isFollowingUser) {
      await unfollow(userId);
    } else {
      await follow(userId);
    }

    setWait(true);
    await getFollowingStatus(userId).then(setIsFollowingUser);
  };

  useEffect(() => {
    isFollowing().then(setIsFollowingUser);
  }, [following, userId]);

  useEffect(() => {
    if (!userId) {
      setFollowing(null);
      setFollowers(null);
      setIsLoading(false);
      setFollowCount({ followers: 0, following: 0 });
      return;
    }

    const load = async () => {
      const [followers, following, followCount] = await Promise.all([
        getUserFollowers(userId),
        getUserFollowing(userId),
        getFollowCount(userId),
      ]);

      setFollowCount(followCount);
      setFollowers(followers.items);
      setFollowing(following.items);
    };

    try {
      load();
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    following,
    followers,
    isLoading,
    isFollowingUser,
    toggleFollow,
    wait,
    followCount,
  };
}

export { useFollow };
