import z from "zod";
import { zodErrorMessages } from "../../../shared/constants/errors.js";





export const id = z.uuid({error:zodErrorMessages.invalid("ID")})


export const optionalId = z.object({userId: z.uuid().optional()}) 

export const userUpdateBody = z.object({
        name: z.string().optional(),
        email: z.email().optional(),
        

    }).strict()