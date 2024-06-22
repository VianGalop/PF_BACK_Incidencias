import { validarCampos } from '../services/validacion.js'
import userModel from '../models/usuario.model.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import bcrypt from 'bcrypt'

export const getUsuarios = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const id = user.id
  try {
    if (isNaN(id)) return res.status(404).json({ message: 'No hay usuarios registrados' })

    // verifica el rol que tiene.
    const isAdmin = await userModel.checkRol(id)
    console.log(isAdmin)
    if (!isAdmin) return res.status(401).json({ message: 'Usted no tienes acceso...' })
    // Consulta a DB
    const rows = await userModel.consultarTabla('usuarios')

    // Verificar que haya datos
    if (rows.length <= 0) return res.status(405).json({ message: 'Usuario no encontrado' })
    // Envia la informacion.
    res.json(rows)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error Interno algo salio mal' })
  }
}

export const getUsuario = async (req, res) => {
  const user = req.user
  if (!user) { return res.status(401).json({ message: 'Usuario no autenticado' }) }
  const id = user.id
  const { idPersona } = req.body
  let getID = 0
  try {
    // verifica el rol que tiene.
    const isAdmin = await userModel.checkRol(id)
    if (!isAdmin) return res.status(401).json({ message: 'Usted no tienes acceso...' })
    if (idPersona != null) {
      getID = idPersona
    }
    const valida = await userModel.validarIdUser(getID)
    if (valida) {
      const usuario = await userModel.where('id_user', getID)
      if (!usuario) {
        return res.status(404).json({ message: 'No exisite el ID del usuario' })
      }
      res.json({ usuario })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUsuario = async (req, res) => {
  const { id } = req.params
  try {
    const valida = await userModel.validarIdUser(id)
    if (valida) {
      const user = await userModel.borrarUsuario(id)
      if (user === false) {
        return res.status(501).json({ message: 'No es posible borrar al usuario' })
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error Interno algo salio mal' })
  }
}

export const registroUsuario = async (req, res) => {
  const { nombre, apellidos, telefono, correo, password } = req.body
  console.log(nombre, apellidos, telefono, correo, password)
  try {
    await validarCampos(nombre, apellidos, telefono, correo, password, 'nuevo')

    const nuevoUsuario = await userModel.registro(nombre, apellidos, telefono, correo, password)
    if (nuevoUsuario !== undefined) {
      return res.json({ message: 'Usuario creado correctamente', nuevoUsuario })
    } else {
      return res.json({ message: 'No se puede registrar, intente mas tarde...' })
    }
  } catch (error) {
    console.log(error.message)
    let message = 'Error interno algo salio mal'
    let statusCode = 500
    if (error?.errno === 1062) {
      message = 'Usuario con ese corre ya existe'
      statusCode = 402
    }
    res.status(statusCode).json({ message })
  }
}

export const getMisDatos = async (req, res) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' })
  }
  const id = user.id
  try {
    const valida = await userModel.validarIdUser(id)
    if (valida) {
      const usuario = await userModel.where('id_user', id)
      if (!usuario) {
        return res.status(404).json({ message: 'No exisite informacion del usuario' })
      }
      res.json({ usuario })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error Interno algo salio mal' })
  }
}

export const actualizarUsuario = async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' })
  }
  const id = user.id
  const { nombre, apellidos, telefono, correo, password } = req.body
  const campo = []
  const valor = []

  try {
    const valida = await userModel.validarIdUser(id)
    console.log('val', valida)
    if (valida) {
      await validarCampos(correo, 'actualizar')
      if (nombre) {
        campo.push('nombre')
        valor.push(nombre)
      }
      if (apellidos) {
        campo.push('apellidos')
        valor.push(apellidos)
      }
      if (telefono) {
        campo.push('telefono')
        valor.push(telefono)
      }
      if (correo) {
        campo.push('correo')
        valor.push(correo)
      }
      if (password) {
        const hashPassword = await bcrypt.hash(password, 10)
        campo.push('password')
        valor.push(hashPassword)
      }

      const actualizaUsuario = await userModel.updateUsuario(campo, valor, id)
      if (actualizaUsuario) {
        return res.json({ message: 'Registro modificado' })
      }
      return res.status(500).json({ message: 'Error al modificar el registro' })
    }
    return res.status(500).json({ message: 'No existe Informacion del usuario' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Error Interno no se pude actualizar el usuario' })
  }
}

export const borrarUsuario = async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' })
  }
  const id = user.id
  const { idPersona } = req.body
  let idBorra = 0
  try {
    const rol = await userModel.checkRol(id)
    if (rol && idPersona != null) {
      idBorra = idPersona
    } else {
      idBorra = id
    }
    const valida = await userModel.validarIdUser(idBorra)
    if (valida) {
      const user = await userModel.borrarUsuario(idBorra)
      if (user === false) {
        return res.status(501).json({ message: 'No es posible borrar el registro' })
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' })
    } else {
      res.status(200).json({ message: 'Usuario no existe' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const iniciarSesion = async (req, res) => {
  const { correo, password } = req.body

  try {
    if (!correo || !password) {
      return res.status(400).json({ message: 'Los campos son obligatorios' })
    }

    const user = await userModel.where('correo', correo)
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    console.log('user', user)
    // verificando password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    const token = jwt.sign({ id: user.id_user }, SECRET_KEY, { expiresIn: '1h' })
    /* localStorage.setItem('tk', token) */
    const datosRes = { tk: token, data: user.rol_type }
    res.setHeader('Authorization', `Bearer ${token}`)
    res.json({ message: 'Inicio de sesión exitoso', datosRes })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
