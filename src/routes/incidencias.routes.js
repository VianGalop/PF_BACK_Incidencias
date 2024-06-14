import { Router } from 'express'
import { actualizarEstadoIncidencia, actualizarIncidencia, borrarIncidencia, buscarInciPorUsuario, buscarPorEstado, buscarPorFecha, crearTipoIncidencia, nuevaIncidencia, todasIncidencias, verTipoIncidencia } from '../controllers/incidencias.controller.js'
import { uploadImagenes } from '../middleware/multer.js'
import { logueado } from '../middleware/loggeado.js'

const router = Router()
router.use(logueado)
// rutas de residente

router.post('/situacion/crear', uploadImagenes.array('imagenes'), nuevaIncidencia)
router.patch('/situacion/actualizar/:idInci', actualizarIncidencia)
router.delete('/situacion/borrar/:idInci', borrarIncidencia)

router.get('/situacion/buscar/usuario', buscarInciPorUsuario)
router.get('/situacion/buscar/fecha', buscarPorFecha)
router.get('/situacion/buscar/estado', buscarPorEstado)

// admin
router.get('/tipoIncidencias/visualizar', verTipoIncidencia)
router.post('/tipoIncidencias/nuevoTipo', crearTipoIncidencia) // FALTA VERRIFICAR CON USUARIO 1
router.patch('/actualizarEstadoIncidencia/:idInc', actualizarEstadoIncidencia)
router.get('/visualizar/incidencias', todasIncidencias)
export default router
