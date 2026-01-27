import { isAdmin } from "../rules/isAdmin";
import { AppUser } from "../types/user";

function normalizePagination(
    page?: number,
    limit?: number,
    user?: AppUser,
) {
  const maxLimit = isAdmin(user) ? 100 : 20; // limit = take no prisma

  return {
    page: Math.max(page ?? 1, 1),
    limit: Math.min(Math.max(limit ?? 10, 1), maxLimit),
  };
}

export { normalizePagination };