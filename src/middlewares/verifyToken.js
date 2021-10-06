const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    const token = authHeader.split(" ")[1]
    if(authHeader){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err){
                res.status(403).json("Token is not valid!")
            }
            req.user = user
            next()
        })
    }else{
        return res.status(400).json("You are not authenticated!")
    }
}

module.exports = verifyToken