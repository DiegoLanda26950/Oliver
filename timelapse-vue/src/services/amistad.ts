const API_URL = 'https://localhost:7171/api'

export interface Amistad {
  idAmistad: number
  idUsuario1: number
  idUsuario2: number
  estado: string
}

export interface Usuario {
  idUsuario: number
  nombre: string
  email: string
}

export interface AmigoPerfil extends Usuario {
  idAmistad: number
  estado: string
}

// Obtiene todas las amistades y filtra las del usuario actual,
// luego resuelve el perfil del "otro" usuario en cada par
export async function getAmigosByUsuario(idUsuario: number): Promise<AmigoPerfil[]> {
  // 1. Traemos todas las amistades
  const resAmistades = await fetch(`${API_URL}/Amistad`)
  if (!resAmistades.ok) throw new Error('Error al obtener amistades')
  const amistades: Amistad[] = await resAmistades.json()

  // 2. Filtramos las que pertenecen a este usuario (puede estar en idUsuario1 o idUsuario2)
  const misAmistades = amistades.filter(
    (a) => a.idUsuario1 === idUsuario || a.idUsuario2 === idUsuario
  )

  if (misAmistades.length === 0) return []

  // 3. Traemos todos los usuarios para resolver nombres
  const resUsuarios = await fetch(`${API_URL}/Usuario`)
  if (!resUsuarios.ok) throw new Error('Error al obtener usuarios')
  const usuarios: Usuario[] = await resUsuarios.json()

  const usuariosMap = new Map(usuarios.map((u) => [u.idUsuario, u]))

  // 4. Construimos el perfil del amigo (el "otro" en el par)
  const amigos: AmigoPerfil[] = misAmistades
    .map((a) => {
      const idAmigo = a.idUsuario1 === idUsuario ? a.idUsuario2 : a.idUsuario1
      const perfil = usuariosMap.get(idAmigo)
      if (!perfil) return null
      return {
        idUsuario: perfil.idUsuario,
        nombre: perfil.nombre,
        email: perfil.email,
        idAmistad: a.idAmistad,
        estado: a.estado
      }
    })
    .filter((a): a is AmigoPerfil => a !== null)

  return amigos
}

export async function eliminarAmistad(idAmistad: number): Promise<void> {
  const res = await fetch(`${API_URL}/Amistad/${idAmistad}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar amistad')
}
