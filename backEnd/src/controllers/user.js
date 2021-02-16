const User = require('../models/user');

exports.signup = (req,res)=>{
    User.findOne({email: req.body.email}, (error,user) => {
        if(user) return res.status(400).json({
            message:'User Already registered!'
        });
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            userName:Math.random().toString()
        });
        newUser.save((error,data)=>{
            console.log(error)
            if(error){
                return res.status(400).json({
                    message:'Something went wrong'
                })
            }
            if(data){
                return res.status(201).json({
                    message:'User created Successfully ...!'
                })
            }
        })
    })
}