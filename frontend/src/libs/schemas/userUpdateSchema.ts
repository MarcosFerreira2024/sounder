import { z } from "zod";

export const userUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, "O nome deve conter pelo menos 2 caracteres")
    .max(50, "O nome deve conter no máximo 50 caracteres"),
  about: z
    .string()
    .min(30, "O sobre deve conter pelo menos 30 caracteres")
    .max(500, "O sobre deve conter no máximo 500 caracteres"),
});
