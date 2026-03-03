import { NextFunction, Request, Response } from "express";
import multer from "multer";
import * as errorConstants from "../shared/constants/errors.js";
import { handleAppError } from "../shared/helpers/handleAppError.js";

export function uploadWithErrorHandler(uploadHandler: (req: Request, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction) => {
        uploadHandler(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    return  handleAppError(res,new Error(errorConstants.Errors.FILE_REQUIRED(err.field || "File")));
                }
                return  handleAppError(res,err.message);
            } else if (err) {
                 if(err.message === "Multipart: Boundary not found"){
                    return  handleAppError(res,new Error(errorConstants.Errors.FILE_REQUIRED("File")));
                }
                return  handleAppError(res,new Error((err.message)));
            }
            next();
        });
    };
}
