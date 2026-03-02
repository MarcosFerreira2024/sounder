import multer from "multer";
import path from "node:path";

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Only image files are allowed"));
  },
});
export const uploadLrc = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isLrc =
      ext === ".lrc" && file.mimetype === "application/octet-stream";

    if (isLrc) {
      return cb(null, true);
    }

    return cb(new Error("Only .lrc files are allowed"));
  },
});
