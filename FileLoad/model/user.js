let mongoose = require('mongoose')
    //1.1引入模式对象
    let Schema = mongoose.Schema
    //1.2创建约束对象
    let usersRule = new Schema({
        account:{
            type:String, 
            required:true,
            unique:true,
        },
        password:{
            type:String, 
            required:true,
        },
        date:{ //用户创建时间
            type:Date,
            default:Date.now()
        },
        enable_flag:{ //用户注销的标志
            type:String,
            default:'Y'
        },
        file:{ //用户上传的文件
            type:[Object]
        },
        delete_file:{ //用户删除的文件
            type:[Object]
        }
    })
    //1.3创建模型对象
    let usersModel = mongoose.model('users',usersRule) //用于生成某个集合所对应模型对象
module.exports = usersModel //暴露模型对象