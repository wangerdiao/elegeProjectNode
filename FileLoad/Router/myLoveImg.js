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
            const delete_file = myFile[0]
            userModel.updateOne({ account: user }, { $pull: { file: { img_id: id } }},(err,data) => { //先删除相册里得数据
                if (err) {
                    console.log(err)
                    res.json({ code: '500' })
                } else{
                    userModel.updateMany({ account: user }, { $addToSet: { love_img: userLoveImg } }, (err, data) => { //再把数据放到收藏得数据库里
                        if (err) {
                            console.log(err)
                            res.json({ code: '500' })
                        } else {
                            res.json({ code: '200' })
                        }
                    })
                }
            })

        }
    })
})
module.exports = () => {
    return router
}