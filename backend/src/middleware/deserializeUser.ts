import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../configs/auth.js";
import { AppUser } from "../shared/types/user.js";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headers = fromNodeHeaders(req.headers);
    const session = await auth.api.getSession({ headers });

    if (session) {
      req.user = session.user as AppUser;
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
