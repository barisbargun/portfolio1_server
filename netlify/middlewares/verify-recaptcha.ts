import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export const verifyRecaptcha = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-recaptcha-token']
    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `secret=${process.env.RECAPTCHA_SERVER_KEY}&response=${token}`
    })
      .then((res) => res.json())
      .then((json: any) => json.success)
      .catch((err) => {
        throw new Error(`Error in Google Siteverify API. ${err.message}`)
      })
    if (token === null || !isHuman) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: ReasonPhrases.FORBIDDEN })
    }
    next()
  }
}
