import { data } from "@tensorflow/tfjs";
import { Response } from "express";

export function appError(res: Response, status: number, message: string) {
  return res.status(status).json({
    data: null,
    message,
  });
}
