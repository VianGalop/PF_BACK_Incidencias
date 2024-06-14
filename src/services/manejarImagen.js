import path from 'node:path'
import fs from 'node:fs'
export const basePath = process.cwd()

export function eliminarArchivo (nameArchivo) {
  const archivo = basePath + '/public/uploads/' + nameArchivo
  const eliminar = path.resolve(archivo)
  fs.access(archivo, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlinkSync(eliminar)
    }
  })
}
