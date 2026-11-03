const nodemailer = require("nodemailer")
require("dotenv").config()

// console.log(process.env.GOOGLE_USER,process.env.GOOGLE_PASS)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASS
    }
})
transporter.verify((error, success) => {
    if (error) {
        console.error('Error Unable to email server:');
        return
    } else {
        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `${process.env.GOOGLE_USER}`,
            to,
            subject,
            text,
            html,
        });

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
module.exports = sendEmail