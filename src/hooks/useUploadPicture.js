import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { getUploadUrl, getCloudinaryConfig } from "../services/cloudinary";

const useUploadPicture = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadPicture = async (uri, email, name) => {
    if (uploading) return;
    setUploading(true);
    setProgress(0);

    try {
      const { uploadPreset } = getCloudinaryConfig();
      const uploadUrl = getUploadUrl();

      const folderPath = `instagram-clone/${email.replace(/[@.]/g, "_")}`;

      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error("Le fichier source n'existe pas : " + uri);
      }

      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const dataUrl = `data:image/jpeg;base64,${base64Image}`;

      const formData = new FormData();
      formData.append("file", dataUrl);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folderPath);
      formData.append("public_id", name);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload Cloudinary failed: ${errorData.error?.message || response.statusText}`
        );
      }

      const result = await response.json();

      if (!result.secure_url) {
        throw new Error("Pas d'URL securisee dans la reponse Cloudinary");
      }

      setProgress(100);
      return result.secure_url;
    } catch (error) {
      console.error("[Cloudinary Upload Error]", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadPicture,
    uploading,
    progress,
  };
};

export default useUploadPicture;