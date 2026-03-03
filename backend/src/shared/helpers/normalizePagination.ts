import { isAdmin } from "../rules/isAdmin.js";
import { AppUser } from "../types/user.js";

function normalizePagination(
    page?: number,
    limit?: number,
    user?: AppUser,
) {

  if(isAdmin(user) && (!limit || !page) ) return {page:undefined, limit:undefined};


  const maxLimit = isAdmin(user) ? 100 : 20; // limit = take no prisma

  


  return {
    page: Math.max(page ?? 1, 1),
    limit: Math.min(Math.max(limit ?? 10, 1), maxLimit),
  };
}

export { normalizePagination };