const API_URL = 'http://localhost:5000/api'

export interface Usuario {
  idUsuario: number
  nombre: string
  email: string
  fechaNac?: string
}

export interface Capsula {
  idCapsula: number
  titulo: string
  descripcion: string
  fechaCreacion: string
  fechaApertura: string
  estado: string
  visibilidad: string
}

export async function getAllUsuarios(): Promise<Usuario[]> {
  const res = await fetch(`${API_URL}/Usuario`)
  if (!res.ok) throw new Error('Error al obtener usuarios')
  return res.json()
}

export async function getAllCapsulas(): Promise<Capsula[]> {
  const res = await fetch(`${API_URL}/Capsula`)
  if (!res.ok) throw new Error('Error al obtener cápsulas')
  return res.json()
}

export async function deleteUsuario(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/Usuario/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) {
    const texto = await res.text()
    throw new Error(texto || `Error ${res.status} al eliminar usuario`)
  }
}

export async function deleteCapsula(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/Capsula/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) {
    const texto = await res.text()
    throw new Error(texto || `Error ${res.status} al eliminar cápsula`)
  }
}