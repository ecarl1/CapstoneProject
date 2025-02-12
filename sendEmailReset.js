const nodemailer = require("nodemailer");

//this is to send a password reset email
const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Outlook", // You can use other services like Outlook, Yahoo
            auth: {
                user: "emcarlson@quinnipiac.edu",  //Replace with your email
                pass: "WAW_dagestancow911"   //Replace with your app password
            }
        });

        const mailOptions = {
            from: "emcarlson@quinnipiac.edu", // Sender email
            to, // Receiver email
            subject,
            text, //Plain text version of the email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
