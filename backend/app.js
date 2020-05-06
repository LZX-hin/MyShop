// 引入模块
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sd = require("silly-datetime");
const session = require("express-session");
const app = express();

//设置允许跨域访问该服务.跨域请求
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/x-www-form-urlencoded")
    // res.header("Content-Type", "*")
    next();
});

// 存储所有数据库模型
global.mongoModel = {};

// 项目配置
// 配置时间模板处理
app.locals.sd = sd;

// session配置
app.use(session({
    secret:"aaa",//加密密钥
    resave:false,
    saveUninitialized:false
}))

app.use(express.static("./uploads"));

// bodyParser配置
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Api接口
app.use("/api",require("./routers/Api"));

// 数据连接与服务器开启
mongoose.connect("mongodb://127.0.0.1:27017/manager",{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if(err){
        throw Error("数据库连接失败");
        return;
    }else{
        app.listen(3000,()=>{
            console.log('请访问: http://127.0.0.1:3000');
        })
    }
})