import { corsAccept } from '../config/config.js'

export const acceptCors = (req, res, next) => {
  const { origin } = req.headers

  if (!origin || corsAccept.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
  } else {
    res.status(403).json({ message: 'CORS no permitido' })
  }
}
