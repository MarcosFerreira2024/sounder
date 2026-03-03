import { isOwner } from "../../../shared/rules/isOwner.js";
import { isAdmin } from "../../../shared/rules/isAdmin.js";
import { AppUser } from "../../../shared/types/user.js";

function canChangeMusic(user: AppUser, ownerId: string): boolean {
  return isAdmin(user) || isOwner(user, ownerId);
}

export { canChangeMusic };