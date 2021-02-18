const {signup,signin,requireSignin} = require( "../../controllers/admin/auth");
const express = require('express');
const {isRequestValidate,validateSignupRequest,validateSigninRequest} = require("../../validator/authValidator");
const router = express.Router();

    router.post('/admin/signin',validateSignupRequest,isRequestValidate, signin);
    router.post('/admin/signup',validateSigninRequest,isRequestValidate, signup);
    // router.post('/profile',requireSignin, (req,res)=>{
    //     res.status(200).json({user:'profile'})
    // });

module.exports=router;