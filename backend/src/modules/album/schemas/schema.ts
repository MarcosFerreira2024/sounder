import z from "zod";
import { zodErrorMessages } from "../../../shared/constants/errors";

export const albumId = z
  .object({
    albumId: z.uuid({ error: zodErrorMessages.invalid("ID") }),
  })
  .strict();

export const createAlbum = z.object({
  name: z
    .string({ error: zodErrorMessages.required("Album Name") })
    .min(1, zodErrorMessages.required("Album Name")),
  artistId: z.uuid({ error: zodErrorMessages.invalid("User ID") }).optional(),
});
