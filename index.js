// index.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt=require('bcrypt')
const cookieparser=require('cookie-parser');
const jwt = require('jsonwebtoken');
const session = require("express-session");
const crypto = require("crypto");

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

//middleware for cookie
app.use(cookieparser());

// Import routes
const home = require('./router/home/home.page');
const about = require('./router/home/about.page');
const contact = require('./router/home/contact.page');
const reviewPlaces = require('./router/home/review.page');
const tours=require('./router/home/tours.page');
const login=require('./router/home/login.page');
const admin=require('./router/admin/admin.page');
const dashboard=require('./router/admin/dashboard/dashboard.page');

const saputara=require('./router/tours/gujarat/saputara.page');
const mountabu=require('./router/tours/rajasthan/mountabu.page');
const marvellousMatheran=require('./router/tours/maharashtra/MarvellousMatheran.page');
const manali=require('./router/tours/kashmir/manali.page');
const hamptapass=require('./router/tours/kashmir/hamptapass.page');

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: false,
    }
}));

// Use routes
app.use('/login',login);
app.use('/', home);
app.use('/about', about);
app.use('/contact', contact);
app.use('/review', reviewPlaces);
app.use('/tours',tours);
app.use('/admin',admin);
app.use('/dashboard',dashboard);

app.use("/logout",(req,res)=> {
    delete req.session.auth;
    res.redirect('/login');
})

app.use('/tours/saputara',saputara);
app.use('/tours/mountabu',mountabu);
app.use('/tours/matheran',marvellousMatheran);
app.use('/tours/manali',manali);
app.use('/tours/hamtaPass',hamptapass);


// Start the server
const port = process.env.PORT || 1234;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
