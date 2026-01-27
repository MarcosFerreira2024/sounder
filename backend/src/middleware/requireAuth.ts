import { NextFunction, Request, Response } from "express";
import { AppUser } from "../shared/types/user";
import { Session } from "better-auth/types";

declare global {
    namespace Express {
        interface Request {
            user?: AppUser;
            session?: Session;
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};