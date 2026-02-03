import z from "zod";
import { playlistId, userId, musicIdParam } from "../../../shared/schema/schema";
import { zodErrorMessages } from "../../../shared/constants/errors";

    export const playlistSchema = z.object({
        name: z.string({error:zodErrorMessages.invalid("playlist name")}).min(1, zodErrorMessages.required("Playlist name")),
        photo: z.string({error:zodErrorMessages.invalidUrl("photo")}).optional()
    }).strict();

    export const playlistBodyUpdateSchema = z.object({
        name: z.string({error:zodErrorMessages.invalid("playlist name")}).min(1, zodErrorMessages.required("Playlist name")).optional(),
        image: z.string({error:zodErrorMessages.invalidUrl("image")}).optional(),
        visibility: z.enum(["PUBLIC", "PRIVATE"], {error:zodErrorMessages.invalidVisibility}).optional()
    }).strict();

    export const playlistFullParamsSchema= z.object({
        userId,
        playlistId
    }).strict();

    export const playlistIdOnlyParamsSchema = z.object({
        playlistId: playlistId
    }).strict();

    export const playlistAndMusicParamsSchema = z.object({
        playlistId: playlistId,
        musicId: musicIdParam
    }).strict();