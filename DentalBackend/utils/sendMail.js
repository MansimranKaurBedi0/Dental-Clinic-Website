const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  console.log(`✉️ Preparing to send email to: ${to}`);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    console.log("📤 Sending now...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent successfully");
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
};

module.exports = sendMail;
