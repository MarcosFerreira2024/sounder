import { User } from "better-auth/types";
import { PlaylistVisibility } from "../../../generated/prisma/enums";

export function canSeePlaylist(ownerId: string, visibility: PlaylistVisibility[] | PlaylistVisibility, user?: User) {


  if(Array.isArray(visibility)) {
    if (visibility.includes("PRIVATE") && user?.id !== ownerId) {
      throw new Error("You do not have permission to view this playlist");
    }
  }

  if (visibility === "PRIVATE" &&  user?.id !== ownerId) {
    throw new Error("You do not have permission to view this playlist");
  }

  return true;
}