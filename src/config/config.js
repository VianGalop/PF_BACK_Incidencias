import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_HOSTNAME = process.env.DB_HOSTNAME || 'localhost'
export const DB_USERNAME = process.env.DB_USERNAME || 'root'
export const DB_DATABASES = process.env.DB_DATABASES || 'incidencias'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_PORT = process.env.DB_PORT || 3308
export const SECRET_KEY = process.env.SECRET_KEY || 'emergencia'
export const corsAccept = 'http://localhost:5173'
