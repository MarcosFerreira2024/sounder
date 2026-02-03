import multer from "multer";




const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes("image")) {
            return cb(new Error("Only images are allowed"));
        }
        cb(null, true);
    }

});


