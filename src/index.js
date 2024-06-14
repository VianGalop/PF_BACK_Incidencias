import express from 'express'
import { PORT } from './config/config.js'
import usuariosInci from './routes/usuarios.routes.js'
import problemasInci from './routes/incidencias.routes.js'
import { acceptCors } from './middleware/cors.js'

const app = express()
app.use(express.json())

app.use(acceptCors)

app.use('/api/incidencias', usuariosInci)
app.use('/api/incidencias', problemasInci)

app.listen(PORT, () => console.log(`Server runnning http://localhost:${PORT}`))
