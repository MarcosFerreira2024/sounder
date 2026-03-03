import { UserRole } from "../../generated/prisma/enums.js";
import { AppUser } from "../types/user.js";

function isArtist(user?:AppUser): boolean {


    if (!user) return false;
    const isArtist = user.artist !== null;

    return isArtist;



}

export { isArtist };