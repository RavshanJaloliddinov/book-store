
const { config } = require("dotenv");
const nodemailer = require( "nodemailer" )
config()

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASS,
    },
  });

  await transporter.sendMail({ to, subject, html });
};

module.exports = sendMail