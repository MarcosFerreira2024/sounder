import { UserRole } from "../../generated/prisma/enums";
import { AppUser } from "../types/user";

function isArtist(user?:AppUser): boolean {


    if (!user) return false;
    const isArtist = user.role === UserRole.ARTIST;

    return isArtist;



}

export { isArtist };