import { UserRole } from "../../generated/prisma/enums";
import { AppUser } from "../types/user";

function isAdmin(user?:AppUser): boolean {

    if (!user) return false;

    const isAdmin = user.role === UserRole.ADMIN;

    return isAdmin;



}

export { isAdmin };