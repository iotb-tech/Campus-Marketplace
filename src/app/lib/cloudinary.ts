import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nextjs-marketplace");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};