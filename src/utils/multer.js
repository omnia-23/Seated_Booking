import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  //   if (!file.mimetype.startsWith("image"))
  //     return cb(new AppError("Images only!", 400), false);
  //   cb(null, true);
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const isValidExtension = /\.(jpg|jpeg|png)$/.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValidMimeType && isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed!"), false);
  }
}

export const upload = multer({ storage, fileFilter });
