import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//cloud uploads
export const cloudUpload = async (req) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path);
  return upload;
};

// delete cloud upload
export const cloudDelete = async (publicID) => {
  await cloudinary.v2.uploader.destroy(publicID);
};
