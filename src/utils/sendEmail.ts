import Mailgun = require("mailgun-js");

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxc2b9c61516a84f219d3f08bc4753a722.mailgun.org",
});
