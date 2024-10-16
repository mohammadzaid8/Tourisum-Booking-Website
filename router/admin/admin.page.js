const express = require('express');
const router = express.Router();
const ownerModel=require('../../model/admin/owners/owners.model');
const bcrypt=require('bcrypt');
const isLoggedIn=require('../../middleware/authentification.owner');

router.get('/', (req, res) => {
            res.render('../views/admin/admin',{ownerModel});      
});

router.post('/dashboard',async(req,res)=>{
    const {email,password}=req.body;

    
    
    try{
        const owner=await ownerModel.findOne({email:email});

        if (!owner) {
            // If email not found, render the page with an error message
            return res.render('../views/admin/admin', { error: 'Email not found', email, password });
        }
        
        if(password !== owner.password){
            return res.render('../views/admin/admin', { error: 'Invalid password', email });
        }

        req.session.owner = owner; 

        res.redirect('/dashboard');
        
    }catch(error){

        res.status(500).render('../views/admin/admin', { error: 'Server error', email });
    }
})

module.exports = router;
