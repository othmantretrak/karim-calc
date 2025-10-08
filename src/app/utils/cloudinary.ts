
/**
 * Upload an image to Cloudinary
 * @param file - The image file (from <input type="file"> or a Blob)
 * @param uploadPreset - Your Cloudinary upload preset (required for unsigned uploads)
 * @returns The uploaded image data from Cloudinary
 */
export const uploadToCloudinary = async (
    file: File | Blob
) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!file) throw new Error("No file provided");
    if (!uploadPreset) throw new Error("Missing upload preset");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) throw new Error("Missing Cloudinary cloud name");

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    if (!res.ok) {
        throw new Error("Failed to upload image");
    }

    return res.json(); // Contains { secure_url, public_id, etc. }
};
