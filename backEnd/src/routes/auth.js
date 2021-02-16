const {signup,signin,requireSignin} = require( "../controllers/auth");
const express = require('express');
const router = express.Router();

    router.post('/signin', signin);
    router.post('/signup', signup);
    // router.post('/profile',requireSignin, (req,res)=>{
    //     res.status(200).json({user:'profile'})
    // });

module.exports=router;