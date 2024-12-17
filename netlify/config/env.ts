import 'dotenv/config'

export const env = {
  CLIENT_URL: process.env.CLIENT_URL!,
  RECAPTCHA_SERVER_KEY: process.env.RECAPTCHA_SERVER_KEY!,
  EMAIL: process.env.EMAIL!,
  PASSWORD: process.env.PASSWORD!
}
