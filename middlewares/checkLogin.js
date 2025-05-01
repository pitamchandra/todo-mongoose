const jwt = require('jsonwebtoken')
const checkLogin = (req, res, next) => {
    const {authorization} = req.headers
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwt_SECRET)
        console.log(decoded);
        const { username, userId} = decoded
        req.username = username
        req.userId = userId
        next()
    }catch (err){
        next('Authentication Failure')
        // res.status(500).json({
        //     status: "failed",
        //     message: err.message
        // })
    }

}

module.exports = checkLogin;