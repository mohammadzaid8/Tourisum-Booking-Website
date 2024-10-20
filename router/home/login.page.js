const express = require('express');
const router = express.Router();
const User=require('../../model/user/user.model');
const bcrypt=require('bcrypt');

router.get('/', (req, res) => {
    const auth = req.session.auth || false;
            
            res.render('../views/main/loginUser/login', {auth});  

});

router.post('/', async (req, res) => {
    try {

        const auth = req.session.auth || false;

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            // If email doesn't exist
            return res.render('../views/main/loginUser/login', { errorMessage: 'Email ID does not exist',auth });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If password is incorrect

            return res.render('../views/main/loginUser/login', { errorMessage: 'Incorrect password',auth });
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
    const auth = req.session.auth || false;
    res.render('../views/main/loginUser/create',{auth});      
});

router.post('/createuser',async(req,res)=>{
    try{
        const auth = req.session.auth || false;

        const {username,firstname,lastname,email,password}=req.body;

        const existemail=await User.findOne({email:email});
        if(existemail){
            return res.render('../views/main/loginUser/create', { errorMessage: 'Email ID already exists',auth });
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
    
        
    res.redirect('/login');

    }catch(error){
        res.send("please enter data properly and try again");
    }
    

});
module.exports = router;
