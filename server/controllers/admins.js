const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('./../models/user');

const secret = process.env.JWT_SECRET;

module.exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if(username !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWD) {
            return res.status(404).json({
                description: 'Login failed due to Invalid Credentials',
                content: {
                    type: 'Client Error',
                    code: '404',
                    path: '/admin/login',
                    message: 'Invalid credentials'
                }
            })
        }

        const token = jwt.sign({ username }, secret, { expiresIn: "1d" });

        res.status(200).json({ token, description: 'Logged in Successfully'});


    } catch (error) {
        res.status(500).json({
            description: "Login Failed due to some unexpected error",
            content: {
                type: 'System Error',
                code: '500',
                path: '/admin/login',
                message: `Error processing request ${error.message}`
            }
        })
    }

}

module.exports.getAll = async (req, res) => {

    try {

        const users = await User.find({}).sort({"lastLoggedIn": 1});

        res.status(200).json(users);

    } catch(error) {
        res.status(400).json({
            message: "Unexpected Error"
        })
    }

}