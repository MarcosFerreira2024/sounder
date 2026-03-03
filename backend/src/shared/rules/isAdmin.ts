import { UserRole } from "../../generated/prisma/enums.js";
import { AppUser } from "../types/user.js";

function isAdmin(user?:AppUser): boolean {

    if (!user) return false;

    const isAdmin = user.role === UserRole.ADMIN;

    return isAdmin;



}

export { isAdmin };