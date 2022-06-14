const { verify } = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    checkWebToken: (req, res, next) => {
        let token = req.get("authorization")
        if(!token) {
            return res.status(401).json({
                success: 0,
                message: "Access denied! User is not authenticated"
            })
        } else {
            token = token.split(" ")[1]
            verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if(err){
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid token",
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        }
    }
}