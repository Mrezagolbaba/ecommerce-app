const express = require('express');
const {addItemToCart} = require ('../controllers/cart');
const { requireSignin, userMiddleware } = require('../middleware');
const router = express.Router();


router.post('/user/cart/addToCart',requireSignin,userMiddleware,addItemToCart);

module.exports=router;