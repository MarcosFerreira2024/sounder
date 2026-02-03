
export type FollowDTO = {
  id: string;
  name: string;
  image: string | null;
};

interface IFollowRepository {

    followUser(followerId: string, followingId: string): Promise<void>;

    unfollowUser(followerId: string, followingId: string): Promise<void>;


    getFollowers(userId: string,page?:number, limit?:number): Promise<FollowDTO[]>;

    getFollowing(userId: string,page?:number, limit?:number): Promise<FollowDTO[]>;

    


}



export { IFollowRepository }