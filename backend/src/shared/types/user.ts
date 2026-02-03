import { User as BetterAuthUser } from "better-auth";
import { UserRole } from "../../generated/prisma/enums";
import { Artist } from "../../generated/prisma/client";
import z from "zod"

export type AppUser = BetterAuthUser & {
    role: UserRole;
    artist?: Artist
}
