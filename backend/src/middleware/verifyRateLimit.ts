import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { AppUser } from "../shared/types/user";
import { ipKeyGenerator } from "express-rate-limit";
import crypto from "crypto";

const verifyRateLimit = (limit?: number) => {
  return rateLimit({
    windowMs: 60 * 1000,
    max: limit ?? 3,
    keyGenerator: (req: Request) => {
      const userId = (req.user as AppUser)?.id;
      const ip = req.ip ?? crypto.randomUUID();

      return userId ?? ipKeyGenerator(ip);
    },
    handler: (req: Request, res: Response) => {
      const retryAfter = res.getHeader("Retry-After") || 60;

      res.status(429).json({
        data: null,
        message: `Você atingiu o limite de requisições. Tente novamente em ${retryAfter} segundos.`,
      });
    },
  });
};

export default verifyRateLimit;
