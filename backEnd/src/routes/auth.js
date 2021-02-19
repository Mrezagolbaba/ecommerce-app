const {validateSignupRequest,isRequestValidate,validateSigninRequest} =require( "../validator/authValidator");
const {signup,signin} = require( "../controllers/auth");
const express = require('express');
const router = express.Router();

router.post('/signin',validateSigninRequest,isRequestValidate, signin);
router.post('/signup',validateSignupRequest,isRequestValidate, signup);
module.exports=router;