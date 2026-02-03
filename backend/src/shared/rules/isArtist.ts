import { UserRole } from "../../generated/prisma/enums";
import { AppUser } from "../types/user";

function isArtist(user?:AppUser): boolean {


    if (!user) return false;
    const isArtist = user.artist !== null;

    return isArtist;



}

export { isArtist };