const jwt = require('jsonwebtoken');

exports.requireSignin = (req,res,next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        req.user = jwt.verify(token,process.env.JWT_SECRET);
        next()
    }
    return res.status(400).json({ message:'Authorization require!'})
   
}

exports.userMiddleware = (req,res,next) =>{

}
exports.adminMiddleware = (req,res,next) =>{

    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message:'Access denied'
        })
    }
    next()
    
}