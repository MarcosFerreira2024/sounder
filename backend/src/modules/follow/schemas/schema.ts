import { z } from "zod";
import { userId } from "../../../shared/schema/schema.js";

export const followSchema = z
  .object({
    userId: userId,
  })
  .strict();
