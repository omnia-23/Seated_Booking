import multer from "multer";
import path from "path";

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["text/csv", "application/vnd.ms-excel"];

  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const isValidExtension =
    path.extname(file.originalname).toLowerCase() === ".csv";

  if (isValidMimeType && isValidExtension) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only CSV files are allowed!"));
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
  fileFilter: fileFilter,
});

export default upload;
