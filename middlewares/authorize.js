const jwt = require('jsonwebtoken')

module.exports.authorize = async function (req, res, next) {
    let token =await req.header('Authorization')
    if (!token) return res.status(401).send("Access Denied ! to token provided")
    // bearer token 🐸
    else token = token.split(" ")[1].trim();

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log(decoded,"decoded 🐸");
        // we will get all information of user in decoded. 
        if(!decoded) res.status(400).send('Invalid token');
        //  decoded value will be undefined if not decoded.
        next()
    } catch (err) {
        return res.status(400).send("Invalid token")
    }
}