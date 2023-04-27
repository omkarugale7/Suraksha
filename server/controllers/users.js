const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const Mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const sendEmail = require("./../utils/email");

const secret = process.env.JWT_SECRET;

module.exports.setProfile = async (req, res) => {

    try {

        let user = req.body;

        const existingUser = await User.findOne({$or: [{ "email": user.email }, { "prn": user.prn }, { "mac_address": user.mac_address }]});
        
        if(existingUser && existingUser.isVerified) return res.status(404).json({ 
            description: "User Already Exists !!!",
            content: {
                type: 'Application Error',
                code: '404',
                path: '/user/profile',
                message: 'User already exists'
            }
         });

         if(existingUser) {
            await User.deleteOne(existingUser);
         }

        user.password = await bcrypt.hash(user.password, 12);

        user = await User.create(user);

        user.password = "";

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "365d" });

        try {

            console.log(user.name.split(" ")[0]);

            const message = `
            <html>
            <body>
            
            <p>Hello <strong>${user.name.split(" ")[0]}</strong>,</p>
            <p>Thank you  for signing up for Suraksha - Your Campus Safety Buddy! We're excited to have you on board.</p> 

            <p>Before you can start using the app, we need to verify your account. To do this, please click on the link below:</p> 
            <p><a href="${process.env.BASE_URL}/user/verify/${token}">www.suraksha.com/verifyMyAccount</a><br></p>

            <p>If you did not sign up for Suraksha, you can safely ignore this email.</p>

            <p>Thanks for Joining Suraksha! Hope you would have a great day ahead !!!</p>
            
            <p>Thanks,<br>
            Team Suraksha</p>
            </body>
            </html>
            `;
            sendEmail(user.email, "Verification Email - Suraksha Your Campus Buddy !!!", message);
        } catch (err) {

            console.log(err);

            return res.status(404).json({ 
                description: "Invalid Email !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile',
                    message: 'Invalid Email'
                }
             });
        }

        res.status(200).json({ content: user, description: 'User profile is created'});

    } catch(error) {

        res.status(500).json({
            description: 'User profile could not be created due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile',
                message: `Error processing request ${error.message}`
            }
        });

    }
};


module.exports.login = async (req, res) => {

    try {

        const { prn, password, mac_address } = req.body;

        const user = await User.findOne({ prn });

        console.log(user);

        if(!user) {
            return res.status(404).json({
                description: "User Does Not Exist !!!",
                content: {
                    type: 'Client Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'User does not exist'
                }
            });
        }

        console.log(mac_address);

        let isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(mac_address !== user.mac_address) isPasswordCorrect = false;

        if(!isPasswordCorrect) {
            return res.status(404).json({
                description: "Invalid Credentials !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'Invalid credentials'
                }
            });
        }

        if(!user.isVerified) {
            return res.status(404).json({
                description: "Verify Your Account !!!",
                content: {
                    type: 'Application Error',
                    code: '404',
                    path: '/user/profile/login',
                    message: 'Verify Your Account'
                }
            });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "365d" });

        res.status(200).json({ content: user, token, description: 'Logged in Successfully'});

    } catch (error) {
        res.status(500).json({
            description: 'User could not be logged in due to unexpected error',
            content: {
                type: 'System error',
                code: '500',
                path: '/user/profile/login',
                message: `Error processing request ${error.message}`
            }
        });
    }

};

module.exports.markPresent = async(req, res) => {

    const { prn } = req.body;

    try {
        
        const user = await User.findOne({ prn });

        // const now = new Date();
        var currentTime = new Date();

        var currentOffset = currentTime.getTimezoneOffset();

        var ISTOffset = 330;   // IST offset UTC +5:30 

        var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        const year = ISTTime.getFullYear();
        const month = String(ISTTime.getMonth() + 1).padStart(2, '0');
        const day = String(ISTTime.getDate()).padStart(2, '0');
        const hours = String(ISTTime.getHours()).padStart(2, '0');
        const minutes = String(ISTTime.getMinutes()).padStart(2, '0');
        const seconds = String(ISTTime.getSeconds()).padStart(2, '0');
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        console.log(formattedTime);

        user.entries.push(formattedTime);

        user.lastLoggedIn = formattedTime;

        await user.save();

        return res.status(200).json({ message: "User Entry Registered" });

    } catch(error) {

        return res.status(400).json({ message: error.message });

    }

}

module.exports.getProfile = async (req, res) => {

    const { prn } = req.params;

    console.log(prn);

    try {
        
        const user = await User.findOne({prn});

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({
            message: "User not found"
        });
    }

}

module.exports.verifyToken = async (req, res) => {

    const { token } = req.params;

    try {

        let decodedData = jwt.verify(token, secret);

        await User.findByIdAndUpdate(decodedData.id, { isVerified: true });

        return res.status(200).json({ message: "User Successfully Verified !!!" });

    } catch(error) {

        return res.status(500).json({ message: "Invalid Token or Token Expired !!!" });

    }

}