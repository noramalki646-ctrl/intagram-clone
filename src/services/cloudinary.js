import Constants from "expo-constants";

const CLOUDINARY_CLOUD_NAME =
  Constants.expoConfig?.extra?.cloudinaryCloudName ||
  Constants.manifest?.extra?.cloudinaryCloudName ||
  "do0lc6ksb";

const CLOUDINARY_UPLOAD_PRESET =
  Constants.expoConfig?.extra?.cloudinaryUploadPreset ||
  Constants.manifest?.extra?.cloudinaryUploadPreset ||
  "instagram_clone";

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

export const getCloudinaryConfig = () => ({
  cloudName: CLOUDINARY_CLOUD_NAME,
  uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  baseUrl: CLOUDINARY_BASE_URL,
});

export const getUploadUrl = () => `${CLOUDINARY_BASE_URL}/image/upload`;

export const getImageUrl = (publicId, options = {}) => {
  if (!publicId) return null;

  if (publicId.startsWith("http")) {
    return publicId;
  }

  const { width, height, crop = "fill", quality = "auto" } = options;

  let transformation = "";
  if (width || height) {
    const transforms = [`c_${crop}`, `q_${quality}`];
    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    transformation = transforms.join(",") + "/";
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}${publicId}`;
};

export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) {
    return null;
  }
  const parts = cloudinaryUrl.split("/upload/");
  if (parts.length < 2) return null;
  return parts[1].replace(/^v\d+\//, "").split(".")[0];
};