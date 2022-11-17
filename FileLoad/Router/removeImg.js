//用来管理回收站删除图片
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
router.delete('/removeRecycleImg',(req,res) => {
    const {user,id} = req.query
    userModel.updateOne({account:user},{$pull:{delete_file:{img_id:id}}},(err,data) => {//删除delete_file里的一个数据
        if(err) {
            console.log(err)
            res.json({code:'500'})
        }else{
            res.json({code:'200'})
        }
    })
})

module.exports = () => {
    return router
  }