//用来管理删除图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.post('/deletePicture',(req,res) => {
    const {id,user} = req.query
    userModel.findOne({account:user},function(err,data){ //先查找对应的数据
            if(err)  console.log(err)
            else {
                const file = data.file
                const newSrc =file.filter(item => {
                    if(item.img_id == id) {
                        return true //返回符合用户删除对应id的数据(单独一个数据)
                    }
                });
                const deleteFile = data.delete_file
                const deletePictureSrc = deleteFile.map(item => { //获取到对象里的src,放到一个数组里面
                    return item.src
                })
                const deleteImg = newSrc[0] //返回一个对象，对象里有src,img_id
                if (deletePictureSrc.indexOf(deleteImg.src) === -1){ //判断delete_img数据库里没有这一张图片
                    userModel.updateOne({account:user},{$pull:{file:{img_id:id}}},(err,data) => { //后删除数据库一个图片地址
                        if(err) {
                            console.log(err)
                            res.json({code:'500'})
                        }else {
                        userModel.updateMany({account:user},{$addToSet:{delete_file:deleteImg}},(err,data) => { //把删除的数据添加到delete_file里面
                            if(err) {
                                console.log(err)
                                res.json({code:'500'})
                            }else {
                                res.json({code:'200'})
                            }
                        })
                        }
                    })
                }else { //delete_img数据库里有这一张图片
                    userModel.updateOne({account:user},{$pull:{file:{img_id:id}}},(err,data) => {
                        if(err) {
                            console.log(err)
                            res.json({code:'500'})
                        }else {
                            res.json({code:'200'})
                        }
                    })
                }
            }
    })
})


module.exports = () => {
    return router
  }