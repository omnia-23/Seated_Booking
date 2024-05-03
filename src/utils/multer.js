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


const upload = multer({
  dest: "/uploads",
  fileFilter: fileFilter,
});

export default upload;
