const mongoose=require('mongoose');

const reviewPlaceSchema=new mongoose.Schema({
    image: { type: String, required: true },
    reviewerName: { type: String, required: true },
    review: { type: String, required: true },
    placeName: { type: String, required: true },
    companyName: { type: String, required: true }
});

module.exports = mongoose.model('ReviewPlace', reviewPlaceSchema);