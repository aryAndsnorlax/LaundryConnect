require("dotenv").config();

const transporter = require("./src/config/email");

async function sendTestEmail() {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "LaundryConnect Test Email",
            text: "Congratulations! Your email configuration is working successfully."
        });

        console.log("✅ Test email sent successfully.");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

sendTestEmail();