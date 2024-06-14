import { pool } from '../config/db.js'
import userModel from '../models/usuario.model.js'

const registrarInci = async (asunto, tipo, descripcion, imagenes, ubicacion, comentario, estado, fecha, idUser) => {
  console.log(asunto, tipo, descripcion, imagenes, ubicacion, comentario, estado, fecha, idUser)
  const [resultado] = await pool.execute(
    'INSERT INTO incidencia(asunto, descripcion, ubicacion, comentario, estado_id, fecha, tipo_id, usuario_id) VALUES(?, ?, ?, ?, ?, ?, ?,?)',
    [asunto, descripcion, ubicacion, comentario, estado, fecha, tipo, idUser]
  )

  // Corroborar que se ha insertado el nuevo registro
  if (resultado.affectedRows === 1) {
    if (imagenes.length > 0) {
      const idsImagenes = await insertaImagenes(imagenes)
      idsImagenes.forEach(element => {
        const valor = insertTablaIncidenciaImg(element, resultado.insertId)
        if (valor) console.log('guardo imagen')
      })
    }

    const newInci = await datosIncidencia('id_inci', resultado.insertId)
    return newInci
  } else {
    return undefined
  }
}

const actualizaInci = async (idUser, campoSQL, valores, idInci) => {
  const id = parseInt(idInci)
  const consulta = campoSQL.map(sql => `${sql} = ?`).join(', ')
  let stringSQL = ''
  let valoresSQL = []
  const propietario = await userModel.checkRol(idUser)
  if (propietario) { // admin
    stringSQL = `UPDATE incidencia SET ${consulta} WHERE id_inci = ?`
    valoresSQL = [...valores, id]
  } else {
    stringSQL = `UPDATE incidencia SET ${consulta} WHERE id_inci = ? AND usuario_id = ?`
    valoresSQL = [...valores, idUser]
  }

  const [resultado] = await pool.execute(stringSQL, valoresSQL)

  if (resultado.affectedRows === 1) {
    return true
  } else {
    return false
  }
}

const datosIncidencia = async (columna, valor) => {
  const [incidecia] = await pool.execute(
        `SELECT id_inci, asunto , descripcion, ubicacion, comentario, estado_id, fecha, tipo_id FROM incidencia WHERE ${columna} = ?`, [valor]
  )
  /* console.log(incidecia) */

  return incidecia?.length === 0 ? undefined : incidecia[0]
}

const insertTablaIncidenciaImg = async (idImg, idInci) => {
  const [resultado] = await pool.execute('INSERT INTO incidencias_imagenes(incidencia_id, imagen_id) VALUES(?, ?)', [idInci, idImg])
  // Corroborar que se ha insertado el nuevo registro
  if (resultado.affectedRows === 1) { return true }

  return false
}

const filtroBuscar = async (campo, valor) => {
  const sql = `SELECT inc.id_inci, inc.asunto , inc.descripcion, inc.ubicacion, inc.comentario, est.estado, 
    inc.fecha, tin.   nombre_tipo_incidencia, usuario_id FROM incidencia inc INNER JOIN estados est ON 
    inc.estado_id = est.id_estado INNER JOIN tipoIncidencias tin ON inc.tipo_id = tin.id_tipo WHERE ${campo} = ?`
  console.log(sql)
  const [result] = await pool.execute(sql, [valor])

  return result?.length === 0 ? undefined : result
}

const filtroBusqueda = async (rol, campo, buscar, idUser) => {
  console.log(rol, campo, buscar, idUser)
  let sql = ''
  let valores = []
  if (rol) { // admin
    sql = `SELECT inc.id_inci, inc.asunto , inc.descripcion, inc.ubicacion, inc.comentario, est.estado, inc.fecha, tin.nombre_tipo_incidencia as tipoIncidencia, us.nombre, us.apellidos FROM incidencia inc 
    INNER JOIN estados est ON inc.estado_id = est.id_estado 
    INNER JOIN tipoIncidencias tin ON inc.tipo_id = tin.id_tipo
    INNER JOIN usuarios us ON inc.usuario_id = us.id_user
    WHERE ${campo} = ?`
    valores = [buscar]
  } else { // residente
    sql = `SELECT inc.asunto , inc.descripcion, inc.ubicacion, inc.comentario, tin.nombre_tipo_incidencia as tipoincidencias, est.estado, inc.fecha 
    FROM incidencia inc 
    INNER JOIN estados est ON inc.estado_id = est.id_estado 
    INNER JOIN tipoIncidencias tin ON inc.tipo_id = tin.id_tipo
    WHERE ${campo} = ? AND inc.usuario_id = ?;`
    valores = [buscar, idUser]
  }
  const [result] = await pool.execute(sql, valores)
  return result?.length === 0 ? undefined : result
}

const insertaImagenes = async (arrayImg) => {
  const idImg = arrayImg.map(async img => {
    const [insertado] = await pool.execute('INSERT INTO imagenes(imagen) VALUES (?)', [img])
    if (insertado.affectedRows === 1) {
      return insertado.insertId
    }
  })
  const idImgPromise = await Promise.all(idImg)
  return idImgPromise
}

const todasInci = async () => {
  const consulta = 'SELECT inc.id_inci, inc.asunto , inc.descripcion, inc.ubicacion, tin.nombre_tipo_incidencia as tipoIncidencia, est.estado, inc.fecha,  us.nombre, us.apellidos,  inc.comentario FROM incidencia inc INNER JOIN estados est ON inc.estado_id = est.id_estado INNER JOIN tipoIncidencias tin ON inc.tipo_id = tin.id_tipo INNER JOIN usuarios us ON inc.usuario_id = us.id_user;'

  const [total] = await pool.execute(consulta)
  return total?.length === 0 ? undefined : total
}

const updateInc = async (valor, idInc) => {
  const [cambio] = await pool.execute('UPDATE incidencia SET estado_id = ? WHERE id_inci = ? ', [valor, idInc])
  console.log(cambio)
  if (cambio.affectedRows === 1) { return true }
  return false
}

const verifyID = async (tabla, campo, valor) => {
  const [dato] = await pool.execute(`SELECT * FROM ${tabla} WHERE ${campo} = ? `, [valor])
  return dato?.length === 0 ? undefined : dato
}

const deleteInc = async (idUser, idInci, rol) => {
  let sql = ''
  let datos = []
  try {
    if (rol) { // admin
      sql = 'DELETE FROM incidencia WHERE id_inci = ?'
      datos = [idInci]
    } else { // residente
      sql = 'DELETE FROM incidencia WHERE usuario_id = ? AND id_inci = ? '
      datos = [idUser, idInci]
    }

    const [borrar] = await pool.execute(sql, datos)
    if (borrar.affectedRows === 1) {
      return true
    }
    return false
  } catch (error) {
    console.log(error.message)
  }
}

const todasTiposInci = async () => {
  const [total] = await pool.execute('SELECT id_tipo, nombre_tipo_incidencia FROM tipoIncidencias')
  return total?.length === 0 ? undefined : total
}

const crearTipoInc = async (nombreTipo) => {
  const [nuevaT] = await pool.execute('INSERT INTO tipoincidencias(nombre_tipo_incidencia) VALUES (?)', [nombreTipo])
  if (nuevaT.affectedRows === 1) {
    return true
  }
  return false
}

export default { registrarInci, actualizaInci, datosIncidencia, filtroBuscar, filtroBusqueda, insertTablaIncidenciaImg, todasInci, updateInc, deleteInc, verifyID, todasTiposInci, crearTipoInc }
