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
    cb(null, file.originalname.split('.')[0] + '.jpg'); //配置文件后缀
  }
})
const upload = multer({ storage: storage })
router.post('/picture', upload.single('file'), (req, res) => {
  console.log(req.file, '我是file')
  console.log(req.body, '我是body')
  const { user } = req.body
  console.log(user)
  const newFile = { src: `http://localhost:3000/uploads/${req.file.filename}`, img_id: uuidv4() }  //设置一个对象，对象里有图片的地址和id
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
})

module.exports = () => {
  return router
}