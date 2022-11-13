//用来管理展示图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
let fs = require('fs')
const path = require('path')
router.get('/picture/showPicture', (req, res) => {
    console.log(req.query)
    const { user } = req.query  //获取前端传来得用户名称
    userModel.find({ account: user }, (err, data) => { //查询该用户所上传的图片
        if (err) console.log(err)
        else {
            console.log(data, '我是data')
            const img = data[0].file  //是一个数组，数组里的每一个对象包含图片地址和id
            console.log(img)
            const result = { code: '200', img }
            res.json(result)
        }
    })
})
module.exports = () => {
    return router
}