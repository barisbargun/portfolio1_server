import nodemailer from 'nodemailer'

export const transporter = (email: string, password: string) =>
  nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: password
    }
  })

export const mailOptions = (senderEmail: string, email: string, name: string, message: string) => {
  return {
    from: senderEmail,
    to: senderEmail,
    subject: 'From Portfolio',
    text: `Sender: ${email}\nName:${name}\n\n${message}`
  }
}
