//用来处理回收站回收的 图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.post('/recycleImg', (req, res) => {
    const { user, id } = req.query
    userModel.findOne({ account: user }, function (err, data) { //先查找对应的数据
        if (err) console.log(err)
        else {
            const deleteFile = data.delete_file
            const newImg = deleteFile.filter(item => {
                if (item.img_id == id) {
                    return true //返回符合用户删除对应id的数据(单独一个数据)
                }
            });
            const file_img = newImg[0] //返回一个对象，对象里有src,img_id
            userModel.updateOne({ account: user }, { $pull: { delete_file: { img_id: id } } }, (err, data) => { //后删除数据库一个图片地址
                if (err) {
                    console.log(err)
                    res.json({ code: '500' })
                } else {
                    userModel.updateMany({ account: user }, { $addToSet: { file: file_img } }, (err, data) => { //把删除的数据添加到delete_file里面
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