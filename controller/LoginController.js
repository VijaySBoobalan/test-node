var dbConn = require('../config/db.config');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.login = async function(req,res){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    var email= req.body.email;
    var password = req.body.password;

    dbConn.query('SELECT * FROM usertable WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            if(results.length >0){
                const comparision = await bcrypt.compare(password, results[0].password)
                if(comparision){
                    const payload = {id: results[0].id};
                    const Token = jwt.sign({id:results[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
                    res.send({
                        "code":200,
                        token:Token
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    })
                }
            }else{
                res.send({
                    "code":206,
                    "success":"Email does not exits"
                });
            }
        }
    });
}