import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

function createGmailTransporter(){
  const hostname = process.env.SMTP_SERVER;
  const port = Number(process.env.SMTP_PORT) as number;
  const username = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: hostname,
    port,
    secure: true,
    auth:{
      user: username,
      pass: password,
    },
    logger: true,
  });
  return transporter

};

export async function sendNodeMailer(data:Mail.Options) {
  const transporter = createGmailTransporter();

  const info = await transporter.sendMail(data);

  return info
}