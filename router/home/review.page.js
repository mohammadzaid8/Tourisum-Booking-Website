const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const ReviewPlace = require('../../model/review.places/review.model');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/'); // Save files to 'uploads/' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Render the review form
router.get('/', (req, res) => {
    res.render('../views/main/review');
});

// Handle form submission with file upload
router.post('/createReview', upload.single('reviewImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file); // This will log the uploaded file data

    const { reviewerName, campName, reviewText,placeName } = req.body;

    // Get the uploaded image path
    const image =  'path/to/default-image.jpg';

    // Create a new review object
    const newReview = new ReviewPlace({
        reviewerName,     // Your Name from form
        placeName, // Place Name from form
        review: reviewText, // Review content
        companyName:campName, // Dummy for now
        image: "nothing" // Use uploaded image path
    });

    // Save the review to the database
    newReview.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Error saving review');
        });
});

module.exports = router;
