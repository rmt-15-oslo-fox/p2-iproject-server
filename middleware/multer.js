const Multer = require("multer");
const storage = Multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype;
  if (
    mimetype === "image/png" ||
    mimetype === "image/jpeg" ||
    mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type"));
  }
};

const fileUpload = Multer({ storage: storage, fileFilter });

module.exports = fileUpload;
