// utility/cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRETKEY 
});

/**
 * Uploads a local file to Cloudinary and returns the URL.
 * @param {string} localFilePath - The path to the local file to upload.
 * @returns {Promise<string|null>} - The URL of the uploaded image or null if failed.
 */


const uploadOnCloudinary = async (localFilePath,folderName) => {
    try {
        if (!localFilePath) {
            return null;  // Handle properly
        }

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder:'Review.home.palce',
            resource_type: 'auto' // Automatically detect the file type
        });
        return uploadResult.secure_url; // Return the secure URL of the uploaded image

    } catch (error) {
        // Remove the local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Error uploading to Cloudinary:", error);
        return null;  // Handle properly
    }
};

module.exports = { uploadOnCloudinary };
