import { inject, injectable } from "tsyringe";
import { FollowDTO, IFollowRepository } from "../interfaces/IFollowRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { AppUser } from "../../../shared/types/user";
import { normalizePaginatedResponse } from "../../../shared/helpers/normalizePaginatedResponse";

@injectable()
class GetFollowersById {


    constructor(@inject("FollowRepository") private followRepository: IFollowRepository, @inject("UserRepository") private userRepository: IUserRepository) {








    }



    async execute(id:string,page?:number, limit?:number): Promise<{items:FollowDTO[], page:number, totalItems:number}> {



        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("User does not exist");
        }
        const followers = await this.followRepository.getFollowers(id,page, limit);

        return normalizePaginatedResponse<FollowDTO>(followers, page);




    }
}

export { GetFollowersById }