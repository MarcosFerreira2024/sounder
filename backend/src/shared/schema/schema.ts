import z from "zod"

    export const userId = z.uuid({error:"Invalid user ID, provide a valid user ID"}).min(1, "User ID is required")
    export const playlistId = z.uuid({error:"Invalid playlist ID, provide a valid playlist ID"}).min(1, "Playlist ID is required")
