import { z } from "zod";
import { zodErrorMessages } from "../../../shared/constants/errors";

export const musicId = z.object({
    id: z.uuid(zodErrorMessages.invalid("music ID")),
}).strict();

export const createMusicBody = z.object({
    name: z.string({ error: zodErrorMessages.required("Music name")}).min(1, zodErrorMessages.required("Music name")),
    albumId: z.uuid(zodErrorMessages.invalid("album ID")),
    genres: z.array(z.string({ error: zodErrorMessages.required("Genre name")}).min(1, zodErrorMessages.notEmpty("Genre name"))).min(1, zodErrorMessages.atLeastOne("genre")),
    artistId: z.uuid(zodErrorMessages.invalid("artist ID")).optional(),
}).strict();

export const updateMusicBody = z.object({
    name: z.string().min(1, zodErrorMessages.notEmpty("Music name")).optional(),
    audio: z.url(zodErrorMessages.invalidUrl("audio")).min(1, zodErrorMessages.notEmpty("Audio URL")).optional(),
    albumId: z.uuid(zodErrorMessages.invalid("album ID")).optional(),
    lyrics: z.string().min(1, zodErrorMessages.notEmpty("Lyrics")).optional(),
    genres: z.array(z.string().min(1, zodErrorMessages.notEmpty("Genre name"))).min(1, zodErrorMessages.atLeastOne("genre")).optional(),
}).refine(data => Object.keys(data).length > 0, zodErrorMessages.atLeastOneFieldForUpdate).strict(); 

export const createMusicAndAlbumBody = z.object({
    musicName: z.string().min(1, zodErrorMessages.required("Music name")),
    audio: z.url(zodErrorMessages.invalidUrl("audio")).min(1, zodErrorMessages.required("Audio URL")),
    albumName: z.string().min(1, zodErrorMessages.required("Album name")),
    lyrics: z.string().min(1, zodErrorMessages.required("Lyrics")),
    albumCover: z.url(zodErrorMessages.invalidUrl("album cover")).min(1, zodErrorMessages.required("Album cover URL")),
    genres: z.array(z.string().min(1, zodErrorMessages.notEmpty("Genre name"))).min(1, zodErrorMessages.atLeastOne("genre")),
}).strict();

export const assignMusicToAlbum = z.object({
    musicId:z.uuid(zodErrorMessages.invalid("Music ID")),
    albumId:z.uuid(zodErrorMessages.invalid("Album ID")) ,
    artistId:z.uuid(zodErrorMessages.invalid("ArtistId")).optional(),

}).strict()