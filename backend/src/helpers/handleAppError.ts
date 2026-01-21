import { Response } from "express";
import { ZodError } from "zod";
import { appError } from "./appError";

export function handleAppError(
  res: Response,
  error: any
) {

  if (error instanceof ZodError) {
    return appError(
      res,
      400,
      error.issues[0].message
    );
  }

  if (error instanceof Error) {
      return appError(res, 400, error.message);
  }


  return appError(
    res,
    500,
    "Unexpected error"
  );
}
