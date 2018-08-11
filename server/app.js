const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbConfig = require('./db/dbConfig');
const app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/api',require('./router/api'));

const connection = mysql.createConnection( dbConfig.mysql );

connection.connect(function(err) {
    if(err) {
        console.log("连接数据库失败！");
        console.log(err);
    }else{
        console.log("连接数据库成功！");
        app.listen(8081);
    }
});
