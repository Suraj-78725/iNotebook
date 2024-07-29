
const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const User= require('../models/User');
const fetchuser= require('../middleware/fetchuser');

const jwt = require('jsonwebtoken');
const JWT_SECRET='The$urajknowshowtoburnnowanditknowshowtoburn';
const { body, validationResult } = require('express-validator');
// Route 1: Create user 
router.post('/createuser',[
    body('name',"Enter Valid name").isLength({min:3}),
    body('email',"Enter valid email").isEmail(),
    body('password',"Enter valid password").isLength({min:5}),
],async(req,res)=>{
    // if there are erroor then send bad request 
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        // securing the password by convert into hash + salt 
        const salt=await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password,salt)
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        console.log(authToken)
        await user.save();
        res.json(authToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


// Route 2:  Authrnticate user 

router.post('/login',[
    body('email',"Enter valid email").isEmail(),
    body('password',"Password caanot blank").exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}=req.body;
    try{
        let user = await User.findOne({ email});
        if (!user) {
            return res.status(400).json({ errors:"please try login with correct creditial "});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors:"please try login with correct creditial "});
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json(authToken);

    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})

// Route 3:  get logged user detail 

router.post('/getuser',fetchuser,async(req,res)=>{

try
{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user)

}catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
}

})


module.exports= router