const jwt = require('jsonwebtoken'); 
const secret = 'wz'
const JWT = {
    generate(data,time){
        return jwt.sign(data,secret,{expiresIn: time })
    },
    verify(token){
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return false
        }
    },
}
module.exports = JWT