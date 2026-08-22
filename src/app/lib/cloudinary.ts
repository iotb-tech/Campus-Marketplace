const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const MAX_IMAGE_SIZE_MB = 5;

export function validateImageFile(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please select an image file (JPG, PNG or WebP).";
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return `Image is too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB.`;
  }
  return null;
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Upload is not configured. Missing Cloudinary environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.secure_url) {
    const message =
      data?.error?.message ||
      "Image upload failed. Please check your connection and try again.";
    throw new Error(message);
  }

  return data.secure_url as string;
}
