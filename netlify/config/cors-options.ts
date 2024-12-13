import { env } from './env'

export const corsOptions = {
  origin: (origin: any, callback: CallableFunction) => {
    if (env.CLIENT_URL === origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
