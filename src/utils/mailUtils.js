// src/utils/mailUtils.js
import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Successful",
    text: "Your password has been reset successfully.",
  };

  return transporter.sendMail(mailOptions);
};
