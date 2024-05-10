import { v2 as cloudinary } from "cloudinary";

class uploadImg {
  static uploadImageToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };
}
export default uploadImg;
