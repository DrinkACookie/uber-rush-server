import Mailgun = require("mailgun-js");

const mainGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxc2b9c61516a84f219d3f08bc4753a722.mailgun.org",
});

const sendEmail = (subject: String, html: String) => {
  const emailData = {
    from: "ayyymbebo@gmail.com",
    to: "ayyymbebo@gmail.com",
    subject,
    html,
  };
};
export const sendVerificationEmail = (fullName: String, Key: String) => {
  const emailSubject = `Hello!  ${fullName}  Please verify Email !`;
  const emailBody = `Verification your email by clicking <a = "http://nuber.com/verfication/${Key}" >here</a>`;
  return sendEmail(emailSubject, emailBody);
};
