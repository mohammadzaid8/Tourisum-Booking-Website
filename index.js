// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables early

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Tourisum-Website', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up EJS
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const home = require('./router/home/home.page');
const about = require('./router/home/about.page');
const contact = require('./router/home/contact.page');
const reviewPlaces = require('./router/home/review.page');
const tours=require('./router/home/tours.page');

const saputara=require('./router/tours/gujarat/saputara.page');
const mountabu=require('./router/tours/rajasthan/mountabu.page');

// Use routes
app.use('/', home);
app.use('/about', about);
app.use('/contact', contact);
app.use('/review', reviewPlaces);
app.use('/tours',tours);

app.use('/tours/saputara',saputara);
app.use('/tours/mountabu',mountabu);


// Start the server
const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
