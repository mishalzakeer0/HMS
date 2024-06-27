const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mishalzakeer0@gmail.com", // Your email address
      pass: process.env.SMTP_PASS, // Your email password or application-specific password
    },
  });

  const mailOptions = {
    from: "mishalzakeer0@gmail.com", // Your email address
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = sendEmail;
