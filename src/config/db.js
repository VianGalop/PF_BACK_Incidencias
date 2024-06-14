import { createPool } from 'mysql2/promise'
import { DB_DATABASES, DB_HOSTNAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config.js'

export const pool = createPool({
  host: DB_HOSTNAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASES
})
