import { User as BetterAuthUser } from "better-auth";
import { UserRole } from "../../generated/prisma/enums";

export type AppUser = BetterAuthUser & {
    role: UserRole;
}
