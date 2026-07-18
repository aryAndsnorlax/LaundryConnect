const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./src/models/User");

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    const hashedPassword = await bcrypt.hash("Test@123", 10);

    await User.updateOne(
        { email: "aryan@gmail.com" },
        {
            $set: {
                password: hashedPassword,
                role: "admin"
            }
        }
    );

    console.log("Password reset successfully!");
    console.log("Email: aryan@gmail.com");
    console.log("Password: Test@123");

    mongoose.disconnect();
})
.catch(err => console.log(err));