import { validarIncidencia } from '../services/validacion.js'
import inciModel from '../models/incidencia.model.js'
import userModel from '../models/usuario.model.js'

export const nuevaIncidencia = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  const { asunto, descripcion, ubicacion, tipo, comentario } = req.body
  const imagenes = req.files
  const fecha = new Date().toLocaleDateString('en-ZA')
  const tipoId = parseInt(tipo)
  try {
    validarIncidencia(asunto, descripcion, ubicacion, tipo, comentario, 'nueva')
    // Array con nombre de los archivos
    const misImg = imagenes.map(arch => { return arch.filename })

    /*    const rol = await userModel.checkRol(idUser) */
    const comentar = comentario === undefined ? null : comentario
    const nuevaIncidencia = await inciModel.registrarInci(asunto, tipoId, descripcion, misImg, ubicacion, comentar, 1, fecha, idUser)

    if (nuevaIncidencia !== undefined) {
      return res.json({ message: 'Incidencia creado correctamente', nuevaIncidencia })
    } else {
      return res.json({ message: 'No se puede registrar la incidencia, intente mas tarde...' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error interno' })
  }
}

export const actualizarIncidencia = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  const { idInci } = req.params
  const { asunto, descripcion, ubicacion, tipo, comentario } = req.body
  /* const imagenes = req.files */
  const tipoId = parseInt(tipo)
  try {
    const resultado = await validarIncidencia(asunto, descripcion, ubicacion, tipoId, comentario, 'actualizar')
    const sql = resultado.campoSQL
    const valores = resultado.valorSQL
    /*
    if (imagenes.length > 0) {

    }
    */
    if (sql.length !== 0) {
      const actualizaIncidencia = await inciModel.actualizaInci(idUser, sql, valores, idInci)
      if (actualizaIncidencia === true) {
        res.json({ message: 'Incidencia actualizada correctamente' })
      } else {
        res.json({ message: 'No se puede actualizar, intente mas tarde' })
      }
    }
  } catch (error) {
    res.json({ message: 'Error interno en actualizaciones' })
  }
}

export const buscarInciPorUsuario = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  const { idPersona } = req.body
  try {
    let result = []
    const rol = await userModel.checkRol(idUser)
    if (rol) { // admin
      result = await inciModel.filtroBuscar('usuario_id', idPersona)
    } else {
      result = await inciModel.filtroBuscar('usuario_id', idUser)
    }
    if (result !== undefined) { return res.json(result) }

    return res.json(result)
  } catch (error) {
    return res.json({ message: 'Error interno de busqueda' })
  }
}

export const buscarPorFecha = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  const { fecha } = req.body // fecha 2014-12-23
  try {
    const rol = await userModel.checkRol(idUser)
    const incidenciaFecha = await inciModel.filtroBusqueda(rol, 'fecha', fecha, idUser)

    if (!incidenciaFecha) {
      res.status(404).json({ message: 'No existe incidencia en esta fecha' })
    }
    res.json(incidenciaFecha)
  } catch (error) {
    res.status(500).json({ message: 'Error interno no existe informacion' })
  }
}

export const buscarPorEstado = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  const { estado } = req.body // 1,2,3,...
  try {
    const rol = await userModel.checkRol(idUser)
    const incidenciaEstado = await inciModel.filtroBusqueda(rol, 'estado_id', estado, idUser)
    if (!incidenciaEstado) {
      res.status(404).json({ message: 'No existe incidencia con ese estado' })
    }
    res.json(incidenciaEstado)
  } catch (error) {
    res.status(500).json({ message: 'Error interno no existe informacion' })
  }
}

export const borrarIncidencia = async (req, res) => {
  const { idInci } = req.params
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const idUser = user.id
  try {
    const rol = await userModel.checkRol(idUser)
    const incidencia = await inciModel.deleteInc(idUser, idInci, rol)
    if (incidencia === false) {
      return res.status(404).json({ message: 'No es posible borrar la incidencia' })
    }
    if (incidencia === 1) {
      return res.json({ message: 'No tienes acceso a esa funcion' })
    }
    res.json({ message: 'Incidencia eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error Interno no se pude eliminar la incidencia' })
  }
}

// Administrador
export const actualizarEstadoIncidencia = async (req, res) => {
  const { idInc } = req.params
  const { nuevoEstado } = req.body
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  try {
    const rol = await userModel.checkRol(user.id)
    if (!rol) return res.status(401).json({ message: 'Usted no esta autorizado para esta accion...' })

    const respuesta = await inciModel.verifyID('estados', 'id_estado', nuevoEstado)
    console.log(respuesta)
    if (respuesta === undefined) {
      return res.status(400).json({ message: 'No existe ese estado' })
    }
    const incidecia = await inciModel.updateInc(nuevoEstado, idInc)
    if (!incidecia) {
      res.status(500).json({ message: 'No se puede actualizar la incidencia con ese ID' })
    } else {
      res.status(200).json({ message: 'Actualizacion exitosa' })
    }
  } catch (error) {

  }
}

export const todasIncidencias = async (req, res) => {
  const user = req.user
  try {
    if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
    const rol = await userModel.checkRol(user.id)
    if (!rol) return res.status(401).json({ message: 'Usted no esta autorizado para esta accion...' })

    const todas = await inciModel.todasInci()
    if (todas !== undefined) {
      return res.json(todas)
    }
    return res.json({ message: 'No existen incidencias' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const verTipoIncidencia = async (req, res) => {
  try {
    const tipoIncidencias = await inciModel.todasTiposInci()
    if (tipoIncidencias !== undefined) { return res.json(tipoIncidencias) }
    return res.json({ message: 'No existen ningun tipo de incidencias' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const crearTipoIncidencia = async (req, res) => {
  const user = req.user
  const { nombreTipo } = req.body
  try {
    if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
    const id = user.id

    const isAdmin = await userModel.checkRol(id)
    if (!isAdmin) return res.status(401).json({ message: 'Usted no tienes acceso...' })

    const creado = await inciModel.crearTipoInc(nombreTipo)
    if (creado) {
      return res.json({ message: 'Creacion exitosa del tipo de incidencia' })
    }
    res.json({ message: 'Error al crear el tipo de incidencia' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error interno no se creo el tipo de incidencia' })
  }
}
