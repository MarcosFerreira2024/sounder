import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { isArtist } from "../../../shared/rules/isArtist";
import { isOwner } from "../../../shared/rules/isOwner";

function canChangeAlbum(user: AppUser, ownerId: string): boolean {
    return (isArtist(user) && isOwner(user,ownerId)) || isAdmin(user) ;
}

export { canChangeAlbum };