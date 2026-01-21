import { inject, injectable } from "tsyringe";
import { FollowDTO, IFollowRepository } from "../interfaces/IFollowRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";

@injectable()
class GetFollowersById {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {








    }



    async execute(id:string): Promise<FollowDTO[]> {

        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("User does not exist");
        }
        const followers = await this.followRepository.getFollowers(id);

        return followers;




    }
}

export { GetFollowersById }