const {Router} = require('express')
const JWT = require('./jwt')
const router = new Router()
router.post('/isHaveToken',(req,res) => {
    console.log(req.body)
    const {token} = req.body
    const decoded = JWT.verify(token) //判断token
    console.log(decoded,111)
    if(decoded ===false)  {
        res.send('0') //认证失败
    }
    else {
        console.log(2)
        res.send({status:200})
    }
})
module.exports = () => {
    return router
}