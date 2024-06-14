import multer from 'multer'
import fs from 'fs'
/* import path from 'path' */

export const msg = ''
let nombre = ''
const imagenesDirectory = 'public/uploads'
const createCarpeta = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

createCarpeta(imagenesDirectory)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'imagenes') {
      cb(null, imagenesDirectory)
    } else {
      cb(new Error('Tipo de archivo no permitido'), false)
    }
  },
  filename: (req, file, cb) => {
    nombre = Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '').toLowerCase()
    cb(null, nombre)
  }
})

const fileImg = (req, file, cb) => {
  if (file.fieldname === 'imagenes') {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Solo se permiten archivos de imagen'))
    }
  } else {
    return cb(new Error('Tipo de archivo no permitido'))
  }
  cb(null, true)
}

export const uploadImagenes = multer({ storage, fileImg })
