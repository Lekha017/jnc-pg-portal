import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    const isPdf =
      file.mimetype === "application/pdf";

    return {
      folder: "jnc-pg-portal",

      resource_type: isPdf
        ? "raw"
        : "image",

      public_id: `${Date.now()}-${
        file.originalname.split(".")[0]
      }`,
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG, WEBP and PDF files are allowed"
        )
      );
    }
  },
});

export default upload;