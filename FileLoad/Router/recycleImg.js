//用来处理回收站回收的 图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.post('/recycleImg', (req, res) => {
    const { user, id } = req.query
    userModel.findOne({ account: user }, function (err, data) { //先查找对应的数据
        if (err) console.log(err)
        else {
            const picture = data.file  //是一个数组，数组里面是对象，对象里有图片的地址和id
            const pictureSrc = picture.map(item => { //获取到对象里的src,放到一个数组里面
                return item.src
            })
            const deleteFile = data.delete_file
            const newImg = deleteFile.filter(item => {
                if (item.img_id == id) {
                    return true //返回符合用户删除对应id的数据(单独一个数据)
                }
            });
            const file_img = newImg[0] //返回一个数据得对象，对象里有src,img_id
            if (pictureSrc.indexOf(file_img.src) === -1) {
                userModel.updateOne({ account: user }, { $pull: { delete_file: { img_id: id } } }, (err, data) => { //后删除数据库一个图片地址
                    if (err) {
                        console.log(err)
                        res.json({ code: '500' })
                    } else {
                        userModel.updateMany({ account: user }, { $addToSet: { file: file_img } }, (err, data) => { //把删除的数据添加到delete_file里面
                            if (err) {
                                console.log(err)
                                res.json({ code: '500', message: '回收图片失败' })
                            } else {
                                res.json({ code: '200', message: '回收图片成功' })
                            }
                        })
                    }
                })
            } else {
                res.json({ code: '200', message: '图片已存在相册中' })
            }
        }
    })
})
module.exports = () => {
    return router
}