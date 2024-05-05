const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

const setCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

router.post('/', setCorsHeaders, loginController.handleLogin);

module.exports = router;