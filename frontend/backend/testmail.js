// testMail.js
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log("EmailUser:", process.env.EMAIL_USER);
console.log("EmailPass:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "heil7781@gmail.com",
  subject: "Test email from backend",
  text: "Hello! This is a test email.",
}, function (err, info) {
  if (err) {
    console.error("Error sending test email:", err);
  } else {
    console.log("✅ Test email sent:", info.response);
  }
});
