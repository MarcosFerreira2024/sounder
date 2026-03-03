import { createRequire } from "node:module";
import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

import { NSFWJS } from "nsfwjs";

const require = createRequire(import.meta.url);
const nsfw = require("nsfwjs");

export let model: NSFWJS | null = null;

export const loadModel = async (): Promise<void> => {
  model = await nsfw.load();
  console.log("NSFW model loaded, ready to classify images.");
};

export const convertBufferToTensor = async (
  img: Buffer,
): Promise<tf.Tensor3D> => {
  const { data, info } = await sharp(img)
    .rotate()
    .resize(256, 256, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const tensor = tf.tensor3d(
    new Uint8Array(data),
    [info.height, info.width, info.channels],
    "int32",
  );

  return tensor;
};
