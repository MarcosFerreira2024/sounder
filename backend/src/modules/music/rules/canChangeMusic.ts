import { isOwner } from "../../../shared/rules/isOwner";
import { isAdmin } from "../../../shared/rules/isAdmin";
import { AppUser } from "../../../shared/types/user";

function canChangeMusic(user: AppUser, ownerId: string): boolean {
  return isAdmin(user) || isOwner(user, ownerId);
}

export { canChangeMusic };