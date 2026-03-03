import { AppUser } from "../types/user.js";

function isOwner (user?:AppUser, ownerId?:string): boolean {

    if (!user || !ownerId) return false;

    const isOwner = user.id === ownerId;

    return isOwner;

}

export { isOwner };