import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.log("Could not find local path :: Cloudinary");
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);
        console.log("File uploaded successfully on Cloudinary ::", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading file :: CLOUDINARY ::", error);
        return null;
    }
};

const extractPublicId = (fileUrl) => {
    const parts = fileUrl.split('/');
    const filepart = parts.slice(-1);
    const publicId = filepart[0].split('.')[0];
    return publicId;
};

export const deleteFromCloudinary = async (fileUrl) => {
    if (!fileUrl) {
        console.log("Invalid file URL :: Cloudinary");
        return null;
    }

    const filePublicId = extractPublicId(fileUrl);

    try {
        await cloudinary.uploader.destroy(filePublicId, {
            invalidate: true,
        });

        console.log("File deleted successfully on Cloudinary ::");
    } catch (error) {
        console.log("Error while deleting file :: CLOUDINARY ::", error);
        return null;
    }
}
