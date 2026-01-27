import { z } from "zod";

export const musicId = z.object({
    id: z.uuid("Invalid music ID, provide a valid music ID"),
});

export const createMusicBody = z.object({
    name: z.string().min(1, "Music name is required"),
    audio: z.url("Invalid audio URL").min(1, "Audio URL is required"),
    albumId: z.uuid("Invalid album ID"),
    lyrics: z.string().min(1, "Lyrics are required"),
    genres: z.array(z.string().min(1, "Genre name cannot be empty")).min(1, "At least one genre is required"),
});

export const updateMusicBody = z.object({
    name: z.string().min(1, "Music name cannot be empty").optional(),
    audio: z.url("Invalid audio URL").min(1, "Audio URL cannot be empty").optional(),
    albumId: z.uuid("Invalid album ID").optional(),
    lyrics: z.string().min(1, "Lyrics cannot be empty").optional(),
    genres: z.array(z.string().min(1, "Genre name cannot be empty")).min(1, "At least one genre is required").optional(),
}).refine(data => Object.keys(data).length > 0, "At least one field must be provided for update"); // Ensure at least one field is provided

export const createMusicAndAlbumBody = z.object({
    musicName: z.string().min(1, "Music name is required"),
    audio: z.url("Invalid audio URL").min(1, "Audio URL is required"),
    albumName: z.string().min(1, "Album name is required"),
    lyrics: z.string().min(1, "Lyrics are required"),
    albumCover: z.url("Invalid album cover URL").min(1, "Album cover URL is required"),
    genres: z.array(z.string().min(1, "Genre name cannot be empty")).min(1, "At least one genre is required"),
});