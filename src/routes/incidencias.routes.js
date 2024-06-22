import { Router } from 'express'
import { actualizarEstadoIncidencia, actualizarIncidencia, borrarIncidencia, buscarInciPorUsuario, buscarPorEstado, buscarPorFecha, crearTipoIncidencia, nuevaIncidencia, todasIncidencias, verTipoIncidencia } from '../controllers/incidencias.controller.js'
import { uploadImagenes } from '../middleware/multer.js'
import { logueado } from '../middleware/loggeado.js'

const router = Router()
/* router.use(logueado) */
// rutas de residente

router.post('/situacion/crear', uploadImagenes.array('imagenes'), logueado, nuevaIncidencia)
router.patch('/situacion/actualizar/:idInci', logueado, actualizarIncidencia)
router.delete('/situacion/borrar/:idInci', logueado, borrarIncidencia)

router.get('/situacion/buscar/usuario', logueado, buscarInciPorUsuario)
router.get('/situacion/buscar/fecha', logueado, buscarPorFecha)
router.get('/situacion/buscar/estado', logueado, buscarPorEstado)

// admin
router.get('/tipoIncidencias/visualizar', logueado, verTipoIncidencia)
router.post('/tipoIncidencias/nuevoTipo', logueado, crearTipoIncidencia) // FALTA VERRIFICAR CON USUARIO 1
router.patch('/actualizarEstadoIncidencia/:idInc', logueado, actualizarEstadoIncidencia)
router.get('/visualizar/incidencias', logueado, todasIncidencias)
export default router
