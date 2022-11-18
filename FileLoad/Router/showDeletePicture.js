//用于展示回收站的图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.get('/recycle',(req,res) => {
    const { user,page } = req.query  //获取前端传来得用户名称
    userModel.find({account:user},(err,data) => {
        if (err) console.log(err)
        else {
            let img = data[0].delete_file  //是一个数组，数组里的每一个对象包含图片地址和id
             //数组对象的去重
             const obj = {}
             img=img.reduce((preValue,nextValue) => {
                 obj[nextValue.src] ? '':obj[nextValue.src]=true && preValue.push(nextValue)
                 return preValue
             },[])
             //------分页器部分
             let total = 0
             img.forEach(item => total += 1); //计算用户存储图片得总量
             const limit = 10 //每次请求只传递9个数据用于页面展示
             let sendData = img.slice((page-1)*limit,limit*page)
             const result = { code: '200', sendData,total,limit}
            res.json(result)
        }
    })
})

module.exports = () => {
    return router
}