import multer from "multer";
import path from "path";

class uploadImg {
  fileFilter(req, file, cb) {
    const allowedMimeTypes = ["image/jpeg", "image/png"];

    const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
    const isValidExtension = /\.(jpg|jpeg|png)$/.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (isValidMimeType && isValidExtension) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only JPEG and PNG files are allowed!"));
    }
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${timestamp}${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: uploadImg.fileFilter,
});

export default uploadImg;
