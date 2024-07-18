
const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const User= require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET='The$urajknowshowtoburnnowanditknowshowtoburn';

const { body, validationResult } = require('express-validator');
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
module.exports= router