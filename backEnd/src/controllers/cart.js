const { requireSignin } = require("../middleware")

const Cart = require('../models/cart')

exports.addItemToCart = (req, res) => {


    Cart.findOne({ user: req.user._id })
        .then((cart) => {
            if (cart) {
                // if cart exist then update cart quantity
                const product = req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product == product)
                let condition , update;
                if (item) {
                    condition = { "user": req.user._id, "cartItems.product": product }
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }
                } else {
                    condition = { user: req.user._id }
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }
                    Cart.findOneAndUpdate(condition, update)
                        .then((_cart) => {
                            return res.status(201).json({ cart: _cart })
                        }).catch( (error)=> {
                            res.status(400).json({ error })
                        });


                }}else {
                    // if cart not exist then create new cart
                    const cart = new Cart({
                        user: req.user._id,
                        cartItems: [req.body.cartItems]
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