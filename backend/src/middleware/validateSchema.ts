import { z, ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { appError } from "../shared/helpers/appError.js";
import { handleAppError } from "../shared/helpers/handleAppError.js";

type ValidateSchemas = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
};

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
        file?: unknown;
      };
    }
  }
}

type Schemas = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  file?: z.ZodTypeAny;
};

export function validate(schemas: Schemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validated = {};

      if (schemas.file) {
        req.validated.file = schemas.file.parse(req.file);
      }

      if (schemas.body) {
        req.validated.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.validated.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.validated.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      return handleAppError(res, error);
    }
  };
}
