//用来管理上传图片的路由
const { Router } = require('express')
const router = new Router()
const userModel = require('../model/user')
let path = require('path')
const { v4: uuidv4 } = require('uuid') //引入uuid
const multer = require('multer') //引入multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const url = path.resolve(__dirname, '../public/uploads') //配置文件存储位置
    cb(null, url);//创建uploads文件夹
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8"); //解决中文名字乱码问题
    cb(null, file.originalname.split('.')[0] + '.jpg'); //配置文件后缀
  }
})
const upload = multer({ storage: storage })
// router.post('/picture', upload.array('file') 接受一个以fieldname命名的文件数组。这个文件的信息保存在req.files。
router.post('/picture', upload.single('file'), (req, res) => { //若传递多个图片，则一个一个图片进行处理
  const { user } = req.body
  const newFile = { src: `http://localhost:3000/uploads/${req.file.filename}`, img_id: uuidv4() }  //设置一个对象，对象里有图片的地址和id
  userModel.find({ account: user }, (err, data) => {
    if (err) {
      console.log(err)
      res.json({ code: '500' })
    } else {
      const picture = data[0].file  //是一个数组，数组里面是对象，对象里有图片的地址和id
      const pictureSrc = picture.map(item => { //获取到对象里的src,放到一个数组里面
        return item.src
      })
      if (pictureSrc.indexOf(newFile.src) === -1) { //数据库中没有该图片地址
        userModel.updateMany({ account: user }, { $addToSet: { file: newFile } }, (err, data) => { //$addToSet向数组里面添加一个元素，元素是一个对象，对象里有图片地址和id
          if (err) {
            console.log(err)
            res.send('请求失败')
            return
          }
          if (data) {
            res.json({ data: 200, message: '成功' })
          }
          else res.send('请求失败')
        })
      } else { //数据库中已存在该图片地址
        res.json({ data: 500, message: '图片已存在' })
      }
    }
  })
})

module.exports = () => {
  return router
}