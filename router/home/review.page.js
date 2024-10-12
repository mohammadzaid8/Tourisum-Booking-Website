// router/home/review.page.js
const express = require('express');
const router = express.Router();
const ReviewPlace = require('../../model/review.places/review.model');
const upload = require('../../middleware/multer.middleware');
const { uploadOnCloudinary } = require('../../utility/cloudinary');
const fs = require('fs');

// Default image URL (replace with your actual default image URL from Cloudinary or any placeholder)
const defaultImageUrl = 'https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/default-image.jpg';

// Render the review form
router.get('/', (req, res) => {
    res.render('../views/main/review');
});

// Handle form submission with file upload
router.post('/createReview', upload.single('reviewImage'), async (req, res) => {
    try {
        const { reviewerName, campName, reviewText, placeName } = req.body;

        let imageUrl = defaultImageUrl; // Use default image URL initially

        if (req.file) {
            // Path to the uploaded file
            const localFilePath = req.file.path;

            // Upload the image to Cloudinary
            const uploadedUrl = await uploadOnCloudinary(localFilePath);

            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }

            // Delete the local file after uploading to Cloudinary
            fs.unlink(localFilePath, (err) => {
                if (err) {
                    console.error('Error deleting local file:', err);
                } else {
                    console.log('Local file deleted:', localFilePath);
                }
            });
        }

        // Create a new review object with the image URL
        const newReview = new ReviewPlace({
            reviewerName,      // User's name from form
            placeName,         // Place name from form
            review: reviewText, // Review content from form
            companyName: campName, // Camp name from form
            image: imageUrl    // Uploaded image URL or default
        });

        // Save the review to the database
        await newReview.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving review');
    }
});

module.exports = router;
