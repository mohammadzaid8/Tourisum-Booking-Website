const express = require('express');
const router = express.Router();
const User=require('../../model/user/user.model');
const bcrypt=require('bcrypt');

router.get('/', (req, res) => {
            res.render('../views/main/loginUser/login', {
                auth: req.session.auth
            });  

});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            // If email doesn't exist
            return res.render('../views/main/loginUser/login', { errorMessage: 'Email ID does not exist' });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If password is incorrect
            return res.render('../views/main/loginUser/login', { errorMessage: 'Incorrect password' });
        }
        req.session.auth = true;
        res.redirect('/');
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).send('Something went wrong. Please try again.');
    }
});

router.get('/createuser', (req, res) => {
    res.render('../views/main/loginUser/create');      
});

router.post('/createuser',async(req,res)=>{
    try{
        const {username,firstname,lastname,email,password}=req.body;

        const existemail=await User.findOne({email:email});
        if(existemail){
            return res.render('../views/main/loginUser/create', { errorMessage: 'Email ID already exists' });
        }
        
        const hashPassword=await bcrypt.hash(password,10)

        const newuser=new User({
            username,
            firstname,
            lastname,
            email,
            password:hashPassword,
        });
    
        await newuser.save();
    
        console.log(newuser);
    res.redirect('/login');

    }catch(error){
        res.send("please enter data properly and try again");
    }
    

});
module.exports = router;
