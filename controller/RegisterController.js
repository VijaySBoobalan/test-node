var dbConn = require('../config/db.config');
var bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.register = async function(req,res){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, 10)

    var users={
       "email":req.body.email,
       "password":encryptedPassword
    }
    
    dbConn.query('INSERT INTO usertable SET ?',users, function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            });
        }else{
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    });
}