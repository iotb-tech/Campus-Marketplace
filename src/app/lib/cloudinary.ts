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

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Image upload failed");
  }

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error("Image upload failed: No URL received");
  }

  return data.secure_url;
};