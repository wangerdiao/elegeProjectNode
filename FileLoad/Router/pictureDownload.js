const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
let path = require('path')
router.get('/picture/downloadPicture',(req,res) => {
    console.log(req.query)
    const {user,id} = req.query
    userModel.findOne({account:user},(err,data) => {
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
           if(fileId.indexOf(id)!=-1) { //判断在相册里面下载的 图片
                const fileSrc = file.filter(item => {
                    if(item.img_id == id) {
                        return true
                    }
                })
                console.log(fileSrc)
                const src =fileSrc[0].src.split('/uploads/')[1] //获取图片名称
                console.log(src)
                console.log(path.resolve(__dirname,`../public/uploads/${src}`))
                const downloadSrc = path.resolve(__dirname,`../public/uploads/${src}`)
                res.set({
                    'Content-Type': 'application/octet-stream',// 告诉浏览器这是一个二进制文件
                    'Content-Disposition': 'attachment; filename=' + encodeURIComponent(src) //告诉浏览器这是一个需要下载的文件,同时解决中文问题
                });
                res.download(downloadSrc)
                res.json({code:'200'})
           }else if(love_imgId.indexOf(id)!=-1) { //判断在收藏夹里下载的图片
            res.json({code:'200'})
           }else {
            res.json({code:'500'})
           }
          }
    })
})
module.exports = () => {
    return router
  }