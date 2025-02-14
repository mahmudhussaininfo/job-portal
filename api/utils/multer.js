import multer from "multer";

// multer configuration
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// multer middleware configuration
export const upload = multer({ storage }).single("photo");
export const file = multer({ storage }).single("resume");
