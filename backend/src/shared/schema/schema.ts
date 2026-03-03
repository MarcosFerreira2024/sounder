import z from "zod"
import { zodErrorMessages } from "../constants/errors.js";

export const userId = z.uuid({error:zodErrorMessages.invalid("user ID")}).min(1, zodErrorMessages.required("User ID"))
export const playlistId = z.uuid({error:zodErrorMessages.invalid("playlist ID")}).min(1, zodErrorMessages.required("Playlist ID"))
export const musicIdParam = z.uuid({error:zodErrorMessages.invalid("music ID")}).min(1, zodErrorMessages.required("Music ID"))
