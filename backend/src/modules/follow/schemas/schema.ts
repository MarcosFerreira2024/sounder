import { z } from "zod";
import { userId } from "../../../shared/schema/schema";

export const followSchema = z.object({
    userId:userId

    
}).strict();
