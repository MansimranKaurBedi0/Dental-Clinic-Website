require('dotenv').config();
const nodemailer = require('nodemailer');

async function debugEmail() {
    console.log("--- Email Debugger ---");

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
        console.error("❌ MISSING CREDENTIALS in .env");
        console.error("EMAIL_USER:", user ? "Set" : "Missing");
        console.error("EMAIL_PASS:", pass ? "Set" : "Missing");
        return;
    }

    console.log(`Checking credentials for: ${user}`);
    console.log("Password length:", pass.length);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: pass,
        },
        debug: true, // Enable debug output
    });

    try {
        console.log("Attempting to verify connection...");
        await transporter.verify();
        console.log("✅ Connection Successful! SMTP server is ready.");

        console.log("Attempting to send test email...");
        const info = await transporter.sendMail({
            from: user,
            to: user, // Send to self
            subject: "Debug Test Email",
            text: "If you receive this, the email service is working correctly!",
        });

        console.log("✅ Email sent successfully!");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("❌ FAILED:");
        console.error(error);

        if (error.responseCode === 535) {
            console.log("\n💡 POSSIBLE FIX: Invalid Username or Password.");
            console.log("   - Make sure you are using an APP PASSWORD, not your login password.");
            console.log("   - Go to Google Account > Security > 2-Step Verification > App Passwords.");
        }
    }
}

debugEmail();
