require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

sendEmail(
    "rohitha.7u@gmail.com",
    "Test Email",
    `
    <h2>🩸 On Live Blood Share</h2>

    <p>This is a test email.</p>

    <h3>Congratulations!</h3>

    <p>Your email configuration is working correctly.</p>
    `
);