import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const logueado = (req, res, next) => {
  const authHeader = req.get('Authorization')
  console.log('loguedo', authHeader)
  if (!authHeader) {
    return res.status(401).json({ message: 'No está autenticado' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No está autenticado' })
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded // Guardar la información decodificada en req.user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token no es válido' })
  }
}
