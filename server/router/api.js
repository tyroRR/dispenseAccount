const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/dbConfig');
const accountSql = require('../db/sql/accountSql');

const pool = mysql.createPool( dbConfig.mysql );

let resData;
router.use((req,res,next)=> {
    resData = {
        code: 0,
        message: ''
    };
    next()
});

router.get(`/findAllAccounts`,(req,res) => {
    pool.getConnection((err,con)=>{
        if(err) {
            resData.code = 0;
            resData.message = '建立连接失败';
            res.json(resData);
            console.log("建立连接失败");
        }else {
            console.log("建立连接成功");
            con.query(accountSql.findAll, (err, result) => {
                if (result) {
                    resData.data = result;
                    resData.code = 1;
                    resData.message = '查询成功';
                    console.log(result)
                } else {
                    resData.code = 0;
                    resData.message = '查询失败';
                }
                res.json(resData);
                con.release();
            })
        }
    })
});

router.get(`/getRandomAccount`,(req,res) => {
    pool.getConnection((err,con)=>{
        if(err) {
            resData.code = 0;
            resData.message = '建立连接失败';
            res.json(resData);
            console.log("建立连接失败");
        }else {
            console.log("建立连接成功");
            con.query(accountSql.getRandomAccount, (err, result) => {
                if (result && JSON.stringify(result) !== "[]") {
                    resData.data = result;
                    resData.code = 1;
                    resData.message = '获取成功';
                    if(result[0]){
                        let id = result[0].id;
                        con.query(accountSql.updateStatusAndTime, [id], (err,updateResult) => {
                            if(result){
                                console.log(`id:${id}账户状态已更新  ----------> `, updateResult);
                            }else throw err;
                        })
                    }
                } else {
                    resData.code = 0;
                    resData.message = '获取失败';
                }
                res.json(resData);
                con.release();
            })
        }
    })
});

router.post(`/importAccountList`,(req,res) => {
    const accounts = req.body.accounts;
    if(!accounts){
        resData.code = 0;
        resData.message = '导入账户列表不能为空！';
        res.json(resData);
    }
    pool.getConnection((err,con) =>{
        if(err) {
            resData.code = 0;
            resData.message = '建立连接失败';
            res.json(resData);
            console.log("建立连接失败");
        }else {
            console.log("建立连接成功");
            con.query(accountSql.insertList, [accounts], (err, result) => {
                if (err) {
                    resData.code = 1;
                    resData.message = '导入失败！';
                    console.log(err);
                } else {
                    resData.code = 0;
                    resData.message = `成功导入${result.affectedRows}条账户记录！`;
                }
                res.json(resData);
                con.release();
            })
        }
    })
});

module.exports = router;