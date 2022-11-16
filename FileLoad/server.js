const express = require('express')
const db = require('./db/db')
const usersModel = require('./model/user')
const loginRouter = require('./Router/loginRouter')
const registerRouter = require('./Router/registerRouter')
const isHaveToken = require('./util/isHaveToken')
const filePicture = require('./Router/filePicture')
const showPicture = require('./Router/showPicture')
const deletePicture = require('./Router/deletePicture')
const showDeletePicture = require('./Router/showDeletePicture')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true})) //用来解析请求体参数
db(function (err) {
    if(err) console.log('数据库启动失败')
    else {
        app.use(express.static(path.join(__dirname+'/public'))) //暴露静态资源，使得其他用户可以访问
        // app.use(express.static(__dirname+'/public')) 
        // app.use(express.static('/public')) 
        app.use(express.static('upload')) 
        app.use(loginRouter())
        app.use(registerRouter())
        app.use(isHaveToken())
        app.use(filePicture())
        app.use(showPicture())
        app.use(deletePicture())
        app.use(showDeletePicture())
        app.listen(3000,(err) => {
            if(!err) console.log('服务器启动成功')
            else console.log('启动失败')
        })
    }
})



