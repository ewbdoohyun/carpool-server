import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: "sandboxa79977e83fc34c2a961fb2beb9c8425a.mailgun.org"
});


const sendEmail = (subject:string, html: string) => {
  const emailData = {
    from: "ewb.doohyun@gmail.com",
    to: "ewb.doohyun@gmail.com",
    subject,
    html
  }
  return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a herf="http://test.com/verification/${key}>here<a/>`;
  return sendEmail(emailSubject, emailBody);
}