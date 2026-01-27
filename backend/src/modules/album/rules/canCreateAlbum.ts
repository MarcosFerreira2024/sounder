import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { isArtist } from "../../../shared/rules/isArtist";

function canCreateAlbum(user: AppUser): boolean {
    return isArtist(user) || isAdmin(user);
}

export { canCreateAlbum };