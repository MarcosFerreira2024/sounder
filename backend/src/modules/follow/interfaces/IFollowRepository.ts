
export type FollowDTO = {
  id: string;
  name: string;
  image: string | null;
};

interface IFollowRepository {

    followUser(followerId: string, followingId: string): Promise<void>;

    unfollowUser(followerId: string, followingId: string): Promise<void>;


    getFollowers(userId: string): Promise<FollowDTO[]>;

    getFollowing(userId: string): Promise<FollowDTO[]>;

    


}



export { IFollowRepository }