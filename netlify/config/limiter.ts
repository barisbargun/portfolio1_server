import { rateLimit } from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode: StatusCodes.TOO_MANY_REQUESTS
})
