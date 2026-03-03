import { User as BetterAuthUser } from "better-auth";
import { UserRole } from "../../generated/prisma/enums.js";
import { Artist } from "../../generated/prisma/client.js";

export type AppUser = BetterAuthUser & {
  role: UserRole;
  artist?: Artist;
};
