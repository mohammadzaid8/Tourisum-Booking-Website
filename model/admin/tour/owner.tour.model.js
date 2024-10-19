const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    organization:{ type: String, required: true},
    title: { type: String, required: true },
    location: { type: String, required: true }, // e.g., 'Manali', 'Leh'
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String }, // Optionally, you can store tour images
});

module.exports = mongoose.model('Tour', tourSchema);
