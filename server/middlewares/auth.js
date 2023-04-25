const jwt = require('jsonwebtoken');
require("dotenv").config();

const secret = process.env.JWT_SECRET;

module.exports.auth = async(req, res, next) => {

    try {

        console.log(req.headers);

        const token = req.headers.authorization.split(" ")[1];

        console.log("Token " + token);

        let decodedData;

        decodedData = jwt.verify(token, secret);

        req.userId = decodedData.id;

        next();

    } catch(error) {
        
        return res.status(404).json({ 
            description: "Invalid Token or Token Expired !",
            content: {
                type: 'Application Error',
                code: '404',
                message: 'Invalid Token or Token Expired'
            }
         });
    }

}

module.exports.adminAuth = async(req, res, next) => {

    try {

        // console.log(req.headers);

        const token = req.headers.authorization.split(" ")[1];

        // console.log("Token " + token);

        let decodedData;

        // console.log("Secret" + secret);

        decodedData = jwt.verify(token, secret);

        next();

    } catch(error) {
        
        return res.status(404).json({ 
            description: "Invalid Token or Token Expired !",
            content: {
                type: 'Application Error',
                code: '404',
                message: 'Invalid Token or Token Expired'
            }
         });
    }

}