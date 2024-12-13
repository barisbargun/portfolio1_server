import { NextFunction, Request, Response } from 'express'

import { env } from '@/config/env'

export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (origin && env.CLIENT_URL === origin) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
}
