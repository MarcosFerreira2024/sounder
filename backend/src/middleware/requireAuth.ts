import { Session, User } from "better-auth/types";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: User;
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