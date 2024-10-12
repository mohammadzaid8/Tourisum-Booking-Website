// middleware/multer.middleware.js
const multer = require('multer');
const path = require('path');

// Define storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uplods/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype.toLowerCase());
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif).'));
    }
};

// Initialize Multer with storage, file filter, and limits
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;
