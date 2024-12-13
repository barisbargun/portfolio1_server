import nodemailer from 'nodemailer'

import { env } from './env'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD
  }
})

export const mailOptions = (email: string, name: string, message: string) => {
  return {
    from: env.EMAIL,
    to: env.EMAIL,
    subject: 'From Portfolio',
    text: `Sender: ${email}\nName:${name}\n\n${message}`
  }
}
