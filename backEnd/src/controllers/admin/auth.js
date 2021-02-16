const User = require('../../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req,res)=>{
    User.findOne({email: req.body.email}, (error, user) => {
        if(user) return res.status(400).json({
            message:'Admin Already registered!'
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
            userName:Math.random().toString(),
            role:'admin'
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
                    message:'Admin created Successfully ...!'
                })
            }
        })
    })
};
exports.signin = (req,res) =>{
    User.findOne({email : req.body.email})
        .exec((error,user)=>{
            if(error) return res.status(400).json({error});
            if(user){
                if(user.authenticate(req.body.password) && user.role === 'admin'){
                    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: '1h'})
                    const {_id,firstName,lastName,email,role,fullName}=user;
                    res.status(200).json({
                        token,
                        user:{
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName
                        }
                    });
                }else{
                    return res.status(400).json({message:'Invalid Password'})
                }
            }else {
                return res.status(400).json({message:'Something went wrong'})
            }
        })
};
exports.requireSignin = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token,process.env.JWT_SECRET);
    next()
};