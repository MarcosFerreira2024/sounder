import { NextFunction, Request, Response } from "express";
import { convertBufferToTensor, model } from "../libs/nsfwJs";

export async function VerifyNSFWContent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  if (!req.file) {
    return next();
  }

  if (!model) {
    return res.status(500).send({
      message: "NSFW Detection model not loaded",
      data: null,
    });
  }

  try {
    const imageTensor = await convertBufferToTensor(req.file.buffer);

    const predictions = await model.classify(imageTensor);

    imageTensor.dispose();

    const nsfwClasses = ["Porn", "Hentai", "Sexy"];

    const isNSFW = predictions.some(
      (p: { className: string; probability: number }) =>
        nsfwClasses.includes(p.className) && p.probability > 0.7,
    );

    if (isNSFW) {
      return res.status(400).send({
        message: "Image contains NSFW content",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error try again",
      data: null,
    });
  }
}
