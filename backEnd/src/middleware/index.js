const jwt = require('jsonwebtoken');

exports.requireSignin = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token,process.env.JWT_SECRET);
    next()
}