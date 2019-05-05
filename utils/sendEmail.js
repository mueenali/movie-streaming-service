const nodemailer = require('nodemailer');
require('dotenv').config();
const sendEmail = async (email, subject, content, url) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },// true for 465, false for other ports
            auth: {
                user: process.env.AUTH_NAME , // generated ethereal user
                pass: process.env.AUTH_PASSWORD // generated ethereal password
            }
        });
        let info = await transporter.sendMail({
            from: process.env.SENDER, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: content, // plain text body
            html:
                `<p>${content}</p><a href="${url}">${url}</a>`
        });
        console.log(info.messageId);
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = sendEmail;