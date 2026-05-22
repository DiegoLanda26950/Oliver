const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

//Define la forma del objeto comentario
export interface Comentario {
  idComentario: number
  texto: string
  fechaComentario: string
  idUsuario: number
}

//Defina lo que se necesita para crear un comentario
export interface CrearComentarioDTO {
  texto: string
  idUsuario: number
}

//Muestra los comentarios de la BBDD
//Devuelve la promesa comentarios
export async function getAllComentarios(): Promise<Comentario[]> {
  const res = await fetch(`${API_URL}/Comentario`)
  if (!res.ok) throw new Error('Error al obtener comentarios')
  return res.json()
}

//Recibe el DTO y devuelve el objeto comentario
//Devuelve el comentario compelto
export async function crearComentario(datos: CrearComentarioDTO): Promise<Comentario> {
  const res = await fetch(`${API_URL}/Comentario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      texto: datos.texto,
      idUsuario: datos.idUsuario,
      fechaComentario: new Date().toISOString()
    })
  })
  if (!res.ok) throw new Error('Error al crear comentario')
  return res.json()
}

//Recibe un ID
export async function eliminarComentario(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/Comentario/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar comentario')
}