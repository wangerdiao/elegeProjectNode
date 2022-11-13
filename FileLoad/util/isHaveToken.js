const {Router} = require('express')
const JWT = require('./jwt')
const router = new Router()
router.post('/isHaveToken',(req,res) => {
    const {token} = req.body
    const decoded = JWT.verify(token) //判断token
    if(decoded ===false)  {
        res.send('0') //认证失败
    }
    else {
        res.send({status:200})
    }
})
module.exports = () => {
    return router
}