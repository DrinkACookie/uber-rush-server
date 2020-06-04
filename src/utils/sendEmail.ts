import Mailgun = require("mailgun-js");

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxc2b9c61516a84f219d3f08bc4753a722.mailgun.org",
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "ayyymbebo@gmail.com",
    to: "ayyymbebo@gmail.com",
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};
export const sendVerificationEmail = (fullName: string, Key: string) => {
  const emailSubject = `Hello!  ${fullName}  Please verify Email !`;
  const emailBody = `Verification your email by clicking <a  href= "http://nuber.com/verfication/${Key}" >here</a>`;
  return sendEmail(emailSubject, emailBody);
};
