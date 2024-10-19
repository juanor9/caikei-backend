import { Request, Response } from "express";
import { sendNodeMailer } from "./email";

export async function handleSendReport (req: Request, res: Response) {
  console.log("in handleSendReport");
  const data = req.body;
  try {
    const emailData = {
      from: 'No reply <tanukilibros@gmail.com>',
      to: 'orjuela9@gmail.com',
      subject: '[Caikei Report]',
      text: 'text',
      html: JSON.stringify(data),
    }
    await sendNodeMailer(emailData);
    res.status(201).json(emailData);
  } catch (error:any) {
    res.status(500).json(error.message);
  }
};