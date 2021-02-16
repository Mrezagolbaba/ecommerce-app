const {signup} = require( "../controllers/user");
const express = require('express');
const router = express.Router();

    router.post('/signin', (req,res) => {
        res.status(200).json({
            message:'hi from server'
        })
    });
    router.post('/signup', signup);

module.exports=router;