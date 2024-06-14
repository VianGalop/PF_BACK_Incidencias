import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

const validarIdUser = async (id) => {
  /* if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('ID es inválido')
  } */

  if (!id) {
    const data = await pool.execute('SELECT *  FROM usuarios WHERE id_user= ?', [id])
    console.log(data.length)
    if (data.length === 0) { return false }
  }
  return true
}

const checkRol = async (idUser) => {
  // verifica el rol que tiene.
  const rol = await pool.execute('SELECT rol_type FROM usuarios WHERE id_user = ?', [idUser])

  if (rol.length <= 0) {
    return false
  }

  if (rol[0][0].rol_type !== 1) {
    return false
  }
  return true
}

const consultarTabla = async (tabla) => {
  console.log(tabla)
  const [rows] = await pool.execute(`SELECT * FROM ${tabla}`)
  return rows
}

const where = async (columna, valor) => {
  const [usuario] = await pool.execute(
    `SELECT id_user,nombre, apellidos, telefono, correo, password FROM usuarios WHERE ${columna} = ?`, [valor]
  )
  console.log(usuario)

  return usuario?.length === 0 ? undefined : usuario[0]
}

const registro = async (nombre, apellidos, telefono, correo, password) => {
  const hashPassword = await bcrypt.hash(password, 10) // Encripar la contraseña
  const [resultado] = await pool.execute(
    'INSERT INTO usuarios(nombre, apellidos, telefono, correo, password, rol_type) VALUES(?, ?, ?, ?, ?, ?)',
    [nombre, apellidos, telefono, correo, hashPassword, 2]
  )
  // Corroborar que se ha insertado el nuevo registro
  if (resultado.affectedRows === 1) {
    // Traer los datos del usuario registrado para enviarlo
    const newUser = await where('id_user', resultado.insertId)
    return newUser
  }
  return undefined
}

const borrarUsuario = async (id) => {
  const result = await pool.execute('DELETE FROM usuarios WHERE id_user = ?', [id])
  if (result[0].affectedRows <= 0) {
    return false
  }
  return true
}

const updateUsuario = async (campos, valores, id) => {
  const valoresActualizar = campos.map(campo => `${campo} = ?`).join(', ')
  const sql = `UPDATE usuarios SET ${valoresActualizar} WHERE id_User = ?`
  const [resultado] = await pool.execute(sql, [...valores, id])

  if (resultado.affectedRows === 1) {
    return true
  }
}

export default { validarIdUser, checkRol, consultarTabla, where, registro, updateUsuario, borrarUsuario }
