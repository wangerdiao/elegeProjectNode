//接收用户收藏的图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.post('/loveImg', (req, res) => {
    const { user, id } = req.query
    userModel.findOne({ account: user }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({ code: '500' })
        } else {
            const myFile = data.file
            const userLoveImg = myFile.filter(item => {
                if (item.img_id == id) return true //返回符合用户收藏对应id的数据(单独一个数据)
            })
            const love_img = userLoveImg[0]
            const oldLoveImg = data.love_img
            const oldLoveImgList = oldLoveImg.map(item => { //获取到对象里的src,放到一个数组里面
                return item.src
            })
            if (oldLoveImgList.indexOf(love_img.src) === -1){ //判断love_img数据库里是否有这个数据
                userModel.updateOne({ account: user }, { $pull: { file: { img_id: id } } }, (err, data) => { //先删除相册里得数据
                    if (err) {
                        console.log(err)
                        res.json({ code: '500' })
                    } else {
                        userModel.updateMany({ account: user }, { $addToSet: { love_img } }, (err, data) => { //再把数据放到收藏得数据库里
                            if (err) {
                                console.log(err)
                                res.json({ code: '500' })
                            } else {
                                res.json({ code: '200' })
                            }
                        })
                    }
                })
            }else{ //有了这个数据就不再添加
                userModel.updateOne({ account: user }, { $pull: { file: { img_id: id } } }, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.json({ code: '500' })
                    } else{
                        res.json({ code: '200' })
                    }
                })
            }
        }
    })
})
module.exports = () => {
    return router
}