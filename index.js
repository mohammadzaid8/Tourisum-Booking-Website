const express=require('express');
const app=express();

const mongoose=require('mongoose');
const ejs = require('ejs');
const path=require('path');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/SPM', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const home=require('./router/home/home.page');
const about=require('./router/home/about.page');
const contact=require('./router/home/contact.page');
const reviewPlaces=require('./router/home/review.page');




app.use('/',home);
app.use('/about',about);
app.use('/contact',contact);
app.use('/review',reviewPlaces);





app.listen(1234);