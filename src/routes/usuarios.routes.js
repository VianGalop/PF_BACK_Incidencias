import { Router } from 'express'
import { actualizarUsuario, borrarUsuario, getMisDatos, getUsuario, getUsuarios, registroUsuario, iniciarSesion } from '../controllers/usuarios.controller.js'
import { logueado } from '../middleware/loggeado.js'

const router = Router()

router.post('/login', iniciarSesion)
/* router.use(logueado) */

// User
router.post('/usuarios/registro', registroUsuario)
router.get('/usuarios/misdatos', logueado, getMisDatos)
router.patch('/usuarios/actualizar', logueado, actualizarUsuario)
router.delete('/usuarios/borrar', logueado, borrarUsuario)

// Admin
router.get('/usuarios/admin/listado', logueado, getUsuarios)
router.get('/usuarios/admin/usuario', logueado, getUsuario)

export default router
