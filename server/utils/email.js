const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        var smtpConfig = {
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER1,
                pass: process.env.PASS,
            },
        };

        var transporter = nodemailer.createTransport(smtpConfig);

        await transporter.sendMail({
            from: process.env.USER1,
            to: email,
            subject: subject,
            html: text,
        });
        console.log("Email Sent Sucessfully");
    } catch (error) {
        console.log("Email Not Sent");
        console.log(error);
    }
};

module.exports = sendEmail;
