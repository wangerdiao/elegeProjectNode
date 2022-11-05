//专门管理登录业务的路由
const {Router} = require('express')
const JWT = require('../util/jwt')
//创建路由器
const router = new Router()
//引入模型对象进行CURD
const userModel = require('../model/user')
const sha1 = require('sha1') 
//登录业务
router.post('/login',(req,res) => {
    res.setHeader('Access-Control-Expose-Headers','*')//暴露所有响应头
    console.log(req.body)
    const {account,password} = req.body
      const token = JWT.generate({data:account},"1d") //创建token
    //查找用户是否存在
    userModel.findOne({account,password:sha1(password)},(err,data) => {
        if(err) console.log('请求失败')
        if(data) {
            res.header("Authorization",token) //自定义响应头
            res.json({data:200,message:'成功'})
        }
        else res.send('请求失败')
    })
    
})

module.exports = () => {
    return router
}