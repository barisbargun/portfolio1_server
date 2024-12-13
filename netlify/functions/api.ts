import cors from 'cors'
import promise from 'es6-promise' // For await fetch
import express, { Router } from 'express'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import serverless from 'serverless-http'

import { corsOptions } from '@/config/cors-options'
import { limiter } from '@/config/limiter'
import { mailOptions, transporter } from '@/config/mail'
import { credentials } from '@/middlewares/credentials'
import { verifyRecaptcha } from '@/middlewares/verify-recaptcha'

promise.polyfill()

const app = express()
app.disable('x-powered-by')
app.use(limiter)
app.use(helmet())
app.use(credentials)
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const router = Router()

// @ts-expect-error - OK
router.post('/', verifyRecaptcha(), (req, res) => {
  if (!req || !req.body) return res.sendStatus(StatusCodes.NO_CONTENT)
  const { email, name, message } = req.body

  if (!email || !name || !message) return res.sendStatus(StatusCodes.NO_CONTENT)

  transporter.sendMail(mailOptions(email, name, message), function (error) {
    if (error) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    } else {
      return res.sendStatus(StatusCodes.OK)
    }
  })
})

app.use('/api/', router)

app.listen(8080, () => console.log('listening 8080'))

export const handler = serverless(app)
