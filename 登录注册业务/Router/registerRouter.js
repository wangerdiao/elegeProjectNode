//专门管理注册业务的路由
const {Router} = require('express')
//创建路由器
const router = new Router()
//引入模型对象进行CURD
const userModel = require('../model/user')
const sha1 = require('sha1') //用于加密数据
//登录业务
router.post('/register',(req,res) => {
    console.log(1)
    const {account,password} = req.body
    console.log(account,password)
    //查找账户是否存在
    userModel.findOne({account},(err,data) => {
        if(data || err) res.send('请求失败')
        else {
            //在数据库中存储账户和密码
            userModel.create({account,password:sha1(password)},(err,data) => {
                console.log(3)
                if(err) console.log('请求失败')
                if(data) {
                    console.log(4)
                    const msg = {code:200,message:'成功'}
                    console.log(JSON.stringify(msg))
                    res.json(200,{message:'成功'})
                }
                else res.send('请求失败')
            })
        }
    })
    
})
module.exports = () => {
    return router
}