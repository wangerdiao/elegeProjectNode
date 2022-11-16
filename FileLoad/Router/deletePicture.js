//用来管理删除图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
let path = require('path')
router.post('/deletePicture',(req,res) => {
    console.log(req.query)
    const {id,user} = req.query
    userModel.updateOne({account:user},{$pull:{file:{img_id:id}}},function(err,data){ //删除数据库图片地址
            if(err)  console.log(err)
            else {
                console.log(data)
                // userModel.updateMany({account:user},{$addToSet:{delete_file:deleteFile}})
                res.json({code:200})
            }
    })
})


module.exports = () => {
    return router
  }