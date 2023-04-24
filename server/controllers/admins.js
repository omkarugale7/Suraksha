const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('./../models/user');

const secret = process.env.JWT_SECRET;


function isDateOlderThan2Days(dateString) {

    // console.log(dateString);

    if(dateString === "") return true;

    // Convert the date string to a Date object
    const date = new Date(dateString);
  
    // Get the current date
    const now = new Date();
  
    // Calculate the difference between the current date and the given date in milliseconds
    const differenceInMs = now - date;
  
    // Calculate the number of milliseconds in 2 days
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
  
    // Check if the difference is greater than or equal to 2 days in milliseconds
    return differenceInMs >= twoDaysInMs;
}

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

        const { yearOfStudy } = req.params;

        console.log(yearOfStudy);

        const users = await User.find({yearOfStudy}).sort({"lastLoggedIn": 1});

        let remindUsers = [];

        for(var i in users) {
            if(isDateOlderThan2Days(users[i].lastLoggedIn)) remindUsers.push(users[i]);
        }

        res.status(200).json(remindUsers);

    } catch(error) {
        res.status(400).json({
            message: "Unexpected Error"
        })
    }

}

module.exports.grantLeave = async (req, res) => {

    try {

        const { yearOfStudy } = req.params;

        const user = await User.findOne({ yearOfStudy });

        const value = user.grant;

        await User.updateMany(
            { yearOfStudy },
            { $set: { grant: !value } }
          );

        res.status(200).json({
            message: "Successfully Granted Leave"
        });

    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }

}

module.exports.getGrant = async (req, res) => {

    try {
        
        const { yearOfStudy } = req.params;

        const user = await User.findOne({ yearOfStudy });

        const grant = user ? user.grant : false;

        res.status(200).json(grant);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}