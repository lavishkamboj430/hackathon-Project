const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary-v2");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = (folder, options = {}) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
      ...options,
    },
  });

const imageStorage = createStorage("BorrowBox/images", {
  transformation: [
    { width: 1200, height: 1200, crop: "limit", quality: "auto" },
  ],
});

const createUploader = (storage, maxSize, allowedMimeTypes) =>
  multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Unsupported file type"));
      }
      cb(null, true);
    },
  });

const uploadImage = createUploader(imageStorage, 5 * 1024 * 1024, [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

module.exports= { cloudinary, uploadImage };
