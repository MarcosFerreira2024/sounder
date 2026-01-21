import { z } from "zod";

export const followSchema = z.object({
    id: z.uuid({error:"Invalid ID, provide a valid ID"}),

    
});
