//专门管理登录业务的路由
const {Router} = require('express')
//创建路由器
const router = new Router()
//引入模型对象进行CURD
const userModel = require('../model/user')
const sha1 = require('sha1')
//登录业务
router.post('/login',(req,res) => {
    const {account,password} = req.body
    res.setHeader('Access-Control-Allow-Origin','*')
    //查找用户是否存在
    userModel.findOne({account,password:sha1(password)},(err,data) => {
        if(err) console.log('请求失败')
        if(data) res.send("code:200")
        else res.send('请求失败')
    })
    
})

module.exports = () => {
    return router
}