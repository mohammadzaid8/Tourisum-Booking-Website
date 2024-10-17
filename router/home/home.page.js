const express=require('express');
const router=express.Router();

const ReviewPlaces=require('../../model/review.places/review.model');

router.get('/',(req,res)=>{
    const auth = req.session.auth || false;
    ReviewPlaces.find().sort({ createdAt: -1 }).limit(5)
    .then(review=>
        {
        res.render('../views/main/home',{review, auth});
    })
    .catch(err=>{
            res.status(500).send('Server Error');
    })
    
});

module.exports = router;
