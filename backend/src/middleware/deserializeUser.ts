import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../configs/auth';



export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = fromNodeHeaders(req.headers);
        const session = await auth.api.getSession({ headers });

        
        if (session) {
            req.user = session.user;
            req.session = session.session;
        } else {
            req.user = undefined;
            req.session = undefined;
        }
        next();
    } catch (error) {
        next(error);
    }
};


