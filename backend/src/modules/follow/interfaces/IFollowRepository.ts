export type FollowDTO = {
  id: string;
  name: string;
  image: string | null;
};

interface IFollowRepository {
  followUser(followerId: string, followingId: string): Promise<void>;

  unfollowUser(followerId: string, followingId: string): Promise<void>;

  getFollowCount(
    userId: string,
  ): Promise<{ following: number; followers: number }>;

  getFollowers(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<FollowDTO[]>;

  getFollowing(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<FollowDTO[]>;
}

export { IFollowRepository };
