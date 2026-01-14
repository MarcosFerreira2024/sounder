import { z } from "zod";

export const profileUpdateSchema = (initialFullName: string, initialPhoto: string) =>
  z.object({
    fullName: z
      .string()
      .min(2, "O nome deve conter pelo menos 2 caracteres")
      .max(50, "O nome deve conter no máximo 50 caracteres")
      .refine((val) => val !== initialFullName, "O nome não pode ser igual ao anterior"),
    photo: z

      .url("A foto deve ser uma URL válida")
      .refine((val) => val !== initialPhoto, "A foto não pode ser igual à anterior"),
  });
