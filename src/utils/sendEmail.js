const transporter = require("../config/email");

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });

        console.log("Email sent successfully.");
    } catch (error) {
        console.log("Email Error:", error.message);
    }
};

module.exports = sendEmail;