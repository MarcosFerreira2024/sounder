import { AppUser } from "../../../shared/types/user.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { isArtist } from "../../../shared/rules/isArtist.js";

function canCreateMusic(user: AppUser): boolean {
    return isArtist(user) || isAdmin(user);
}

export { canCreateMusic };