import z from "zod";

export const userUpdateSchema = z.object({
            name: z.string({error:"Invalid name, provide a valid name"}),
            image: z.url({error:"Invalid image URL, provide a valid URL"}),
})



export const id = z.uuid({error:"Invalid ID, provide a valid ID"})


