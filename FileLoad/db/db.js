/*
该模块主要用于连接数据库，且判断数据库的连接状态
*/
let mongoose = require('mongoose')
const DB_name = 'fileLoadUser'
const port = 27017
const IP = 'localhost'
//1连接数据库
function connectMongo(callback) {
    mongoose.connect(`mongodb://${IP}:${port}/${DB_name}`)
    //2绑定数据库连接的监听
    mongoose.connection.on('open',function(err)  {
        if(err) {
            console.log('数据库连接失败',err)
            callback(err)
        }
        else {
            console.log('数据库连接成功')
            callback()
        }
    })
}
module.exports = connectMongo