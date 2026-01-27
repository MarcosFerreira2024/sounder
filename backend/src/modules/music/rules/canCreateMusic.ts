import { AppUser } from "../../../shared/types/user";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { isArtist } from "../../../shared/rules/isArtist";

function canCreateMusic(user: AppUser): boolean {
    return isArtist(user) || isAdmin(user);
}

export { canCreateMusic };