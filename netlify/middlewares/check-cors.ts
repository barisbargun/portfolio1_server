import { NextFunction, Request, Response } from 'express'

import { env } from '@/config/env'

export const checkCors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin
  if (!origin || origin != env.CLIENT_URL) {
    res.status(403).json({ error: 'CORS policy not satisfied' })
  } else next()
}
