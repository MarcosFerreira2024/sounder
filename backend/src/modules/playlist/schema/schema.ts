import z from "zod";
import { playlistId, userId } from "../../../shared/schema/schema";

    export const playlistSchema = z.object({
        name: z.string({error:"Invalid playlist name, provide a valid playlist name"}).min(1, "Playlist name is required"),
        photo: z.string({error:"Invalid photo URL, provide a valid URL"}).optional()
    });

    export const playlistBodyUpdateSchema = z.object({
        name: z.string({error:"Invalid playlist name, provide a valid playlist name"}).min(1, "Playlist name is required").optional(),
        image: z.string({error:"Invalid image URL, provide a valid URL"}).optional(),
        visibility: z.enum(["PUBLIC", "PRIVATE"], {error:"Invalid visibility, must be either PUBLIC or PRIVATE"}).optional()
    });



    export const playlistFullParamsSchema= z.object({
        userId,
        playlistId
    });