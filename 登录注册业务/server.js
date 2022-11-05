const express = require('express')
const db = require('./db/db')
const usersModel = require('./model/user')
const loginRouter = require('./Router/loginRouter')
const registerRouter = require('./Router/registerRouter')
const isHaveToken = require('./util/isHaveToken')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true})) //用来解析请求体参数
db(function (err) {
    if(err) console.log('数据库启动失败')
    else {
        app.use(loginRouter())
        app.use(registerRouter())
        app.use(isHaveToken())
        app.listen(3000,(err) => {
            if(!err) console.log('服务器启动成功')
            else console.log('启动失败')
        })
    }
})



