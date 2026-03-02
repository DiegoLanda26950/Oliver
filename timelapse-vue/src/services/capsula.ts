const API_URL = 'http://localhost:5000/api'

export interface Capsula {
  idCapsula: number
  titulo: string
  descripcion: string
  fechaCreacion: string
  fechaApertura: string
  estado: string
  visibilidad: string
}

export interface CrearCapsulaDTO {
  idUsuario: number
  titulo: string
  descripcion: string
  fechaCreacion: string
  fechaApertura: string
  estado: string
  visibilidad: string
}

// Obtiene solo las cápsulas del usuario concreto
export async function getCapsulasByUsuario(idUsuario: number): Promise<Capsula[]> {
  const res = await fetch(`${API_URL}/UsuarioCapsula/usuario/${idUsuario}/capsulas`)
  if (!res.ok) throw new Error('Error al obtener las cápsulas')
  return res.json()
}

export async function getCapsulaById(id: number): Promise<Capsula> {
  const res = await fetch(`${API_URL}/Capsula/${id}`)
  if (!res.ok) throw new Error('Error al obtener la cápsula')
  return res.json()
}

// Crea la cápsula y la vincula al usuario en un solo paso
export async function crearCapsula(datos: CrearCapsulaDTO): Promise<Capsula> {
  const res = await fetch(`${API_URL}/UsuarioCapsula/capsulas/crear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!res.ok) throw new Error('Error al crear la cápsula')
  return res.json()
}

export async function actualizarCapsula(id: number, datos: Capsula): Promise<Capsula> {
  const res = await fetch(`${API_URL}/Capsula/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!res.ok) throw new Error('Error al actualizar la cápsula')
  return res.json()
}

export async function eliminarCapsula(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/Capsula/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar la cápsula')
}