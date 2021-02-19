const {signup,signin,} = require( "../../controllers/admin/auth");
const express = require('express');
const {isRequestValidate,validateSignupRequest,validateSigninRequest} = require("../../validator/authValidator");
const router = express.Router();

    router.post('/admin/signin',validateSigninRequest,isRequestValidate, signin);
    router.post('/admin/signup',validateSignupRequest,isRequestValidate, signup);


module.exports=router;