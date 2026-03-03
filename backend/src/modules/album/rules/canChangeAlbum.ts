import { AppUser } from "../../../shared/types/user.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { isArtist } from "../../../shared/rules/isArtist.js";
import { isOwner } from "../../../shared/rules/isOwner.js";

function canChangeAlbum(user: AppUser, ownerId: string): boolean {
    return (isArtist(user) && isOwner(user,ownerId)) || isAdmin(user) ;
}

export { canChangeAlbum };