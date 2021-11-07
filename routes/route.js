const express = require('express');

var router = express.Router();

var login = require('../controller/LoginController');
var register = require('../controller/RegisterController');
var user = require('../controller/UserController');

// define a root route
router.get('/', (req, res) => {
    res.send("Hello World");
});

// Retrieve all employees
router.post('/api/register',register.register);

router.post('/api/login',login.login);

router.get('/api/user',user.getUsers);

module.exports = router;