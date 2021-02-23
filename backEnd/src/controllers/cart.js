const { requireSignin } = require("../middleware")

const Cart = require('../models/cart')

exports.addItemToCart = (req,res)=>{


        Cart.findOne({user:req.user._id})
        .then((cart) => {
            if(cart){
                // if cart exist then update cart quantity
                const product = req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product==product)
                if(item){
                    Cart.findOneAndUpdate({"user":req.user._id,"cartItems.product":product},{
                        "$set":{
                            "cartItems":{
                                ...req.body.cartItems,
                                quantity:item.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                    .then((_cart) => {
                        return res.status(201).json({cart: _cart })
                    }).catch(function (error) {
                        res.status(400).json({ error })
                    });

                }else{

                    Cart.findOneAndUpdate({user:req.user._id},{
                        "$push":{
                            "cartItems":req.body.cartItems
                        }
                    })
                    .then((_cart) => {
                        return res.status(201).json({cart: _cart })
                    }).catch(function (error) {
                        res.status(400).json({ error })
                    });
                }
                

            }else{
                // if cart not exist then create new cart

                const cart = new Cart({
                    user:req.user._id,
                    cartItems:[req.body.cartItems]
                })
        
                cart.save()
                .then((cart) => {
                    return res.status(201).json({ cart })
                }).catch(function (error) {
                    res.status(400).json({ error })
                });

            }
        }).catch(function (error) {
            res.status(400).json({ error })
        });

        

}