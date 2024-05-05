const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

const setCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

router.post('/', setCorsHeaders, registerController.handleNewUser);

module.exports = router;