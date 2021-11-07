const jwt = require('jsonwebtoken');
var dbConn = require('../config/db.config');
var bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.getUsers = async function(req,res,next){
    try{
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const Token = req.headers.authorization.split(' ')[1];
        
        const decoded = jwt.verify(Token, 'the-super-strong-secrect');
        

        dbConn.query("SELECT `id`,`email` FROM `usertable`", async function (error, results, fields) {
            if (error) {
                res.send({
                    "code":400,
                    "failed":"error ocurred"
                })
            }else{
                if(results.length >0){
                    res.send(results);
                }else{
                    res.send({
                        "code":206,
                        "success":"Email does not exits"
                    });
                }
            }
        });
        
    }catch(err){
        next(err);
    }
}