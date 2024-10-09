
import { v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

//configure multer-storage-cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "e-commerce",
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

export {storage, cloudinary };