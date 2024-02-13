const jwt=require('jsonwebtoken')
const User=require('../model/model')
const crypto=require('crypto')

const jwtSecretKey = '5f657374696e672d546578742d5365727665725f32336665736372697074696f6e2d33303435303536353537343031323334353637'
console.log("Generated JWT Secret Key  from auth:", jwtSecretKey);
const authenticate=(req,res,next)=>{
    try{
        const tokenHeader=req.header('Authorization')
        const token = tokenHeader ? tokenHeader.replace('Bearer ', '') : null;
        console.log('token received>>>>>>>>>>>>',token);
        const decode=jwt.verify(token,jwtSecretKey)
        console.log('userid>>>',decode.userId)
        User.findByPk(decode.userId).then(user=>{
            req.user=user;
            next();
        })
    }
    catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, msg: 'Access token has expired' });
          } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, msg: 'Invalid access token' });
          } else {
            console.log('error from auth>>>>', error);
            return res.status(500).json({ success: false, msg: 'Internal server error' });
          }
        
    }
}
module.exports={
    authenticate}