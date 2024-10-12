const express=require('express');
const router=express.Router();

const ReviewPlaces=require('../../model/review.places/review.model');

router.get('/',(req,res)=>{
    ReviewPlaces.find().sort({ createdAt: -1 }).limit(5)
    .then(review=>
        {
        res.render('../views/main/home',{review});
    })
    .catch(err=>{
            res.status(500).send('Server Error');
    })
    
});

module.exports = router;
