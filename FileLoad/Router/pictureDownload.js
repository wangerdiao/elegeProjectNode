const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
let path = require('path')
router.get('/picture/downloadPicture', (req, res) => {
    console.log(req.query)
    const { user, id } = req.query
    userModel.findOne({ account: user }, (err, data) => {
        if (err) {
            console.log(err)
            res.json({ code: '500' })
        } else {
            const file = data.file //相册里面的数据，是数组对象
            const fileId = file.map(item => {
                return item.img_id
            })
            const love_img = data.love_img //收藏里面的数据，是数组对象
            const love_imgId = love_img.map(item => {
                return item.img_id
            })
            if (fileId.indexOf(id) != -1) { //判断在相册里面下载的 图片
                const fileSrc = file.filter(item => {
                    if (item.img_id == id) {
                        return true
                    }
                })
                const imgName = fileSrc[0].src.split('/uploads/')[1] //获取图片名称
                const imgPath = fileSrc[0].src //获取图片URL
                res.json({ code: 200, imgPath, imgName })
            } else if (love_imgId.indexOf(id) != -1) { //判断在收藏夹里下载的图片
                const loveImgSrc = love_img.filter(item => {
                    if (item.img_id == id) {
                        return true
                    }
                })
                const imgName = loveImgSrc[0].src.split('/uploads/')[1] //获取图片名称
                    const imgPath = loveImgSrc[0].src //获取图片URL
                    res.json({ code: 200, imgPath, imgName })
            } else {
                res.json({ code: '500' })
            }
        }
    })
})
module.exports = () => {
    return router
}