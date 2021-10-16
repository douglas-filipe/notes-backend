const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SEC

const User = require("../models/User")

const verifyToken = (req, res, next) => {
    const token = req.headers['token']
    if(token){
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).json("Token is not valid!")
            }
            req.email = decoded.email
            User.findOne({email: decoded.email})
            .then(user => {
                req.user = user
                next()
            }).catch(err=>{
                res.status(401).json({error: err})
            })
        })
    }else{
        return res.status(400).json("You are not authenticated!")
    }
}

module.exports = verifyToken