import useStore from "@/lib/store";
import { uploadToCloudinary } from "./cloudinary";

const addUploadedImage = useStore.getState().addUploadedImage;

export const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    uploadToCloudinary(files[0]).then((data) => {
        addUploadedImage(data.secure_url);
    });
}

export const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => {
        uploadToCloudinary(file).then((data) => {
            addUploadedImage(data.secure_url);
        });
    });
}