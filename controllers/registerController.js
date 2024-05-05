const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    // Backend validations for empty user input fields
    if(!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});

    // check duplicate usernames in the database
    const duplicate = await User.findOne({ username: user }); // exec
    if(duplicate) return res.sendStatus(409);

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };