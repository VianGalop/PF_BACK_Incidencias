export function validarCampos (nombre, apellidos, telefono, correo, password, action) {
  if (action === 'nuevo') {
    if (!nombre || !apellidos || !telefono || !correo || !password) {
      throw new Error('Llene los campos obligatorios')
    }
    if (!isValidaEmail(correo)) {
      throw new Error('El email es inválido')
    }
  } else if (action === 'actualizar') {
    if (correo && !isValidaEmail(correo)) {
      throw new Error('El email es inválido')
    }
    if (password?.length < 8) {
      throw new Error('El password debe tener almenos 8 caracteres')
    }
  }
}

const isValidaEmail = (correo) => {
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return correoRegex.test(correo)
}

export function validarIncidencia (asunto, descripcion, ubicacion, tipo, comentario, inci) {
  console.log(asunto, descripcion, ubicacion, tipo, comentario, inci)
  if (inci === 'nueva') {
    if (!asunto || !descripcion || !ubicacion || !tipo) {
      throw new Error('Llene los campos obligatorios')
    }
  } else if (inci === 'actualizar') {
    const { campoSQL, valorSQL } = validaCampoUnoaUno(asunto, descripcion, ubicacion, tipo, comentario)
    return { campoSQL, valorSQL }
  }
}

function validaCampoUnoaUno (asunto, descripcion, ubicacion, tipo, comentario) {
  console.log('uno a uno', asunto, descripcion, ubicacion, tipo, comentario)
  const campoSQL = []
  const valorSQL = []

  if (asunto) {
    campoSQL.push('asunto')
    valorSQL.push(asunto)
  }
  if (descripcion) {
    campoSQL.push('descripcion')
    valorSQL.push(descripcion)
  }
  if (ubicacion) {
    campoSQL.push('ubicacion')
    valorSQL.push(ubicacion)
  }
  if (tipo) {
    campoSQL.push('tipo')
    valorSQL.push(tipo)
  }
  if (comentario) {
    campoSQL.push('comentario')
    valorSQL.push(comentario)
  }

  return { campoSQL, valorSQL }
}
