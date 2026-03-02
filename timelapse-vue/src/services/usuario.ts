import { getUsuario } from '@/services/auth'

const API_URL = 'http://localhost:5000/api'

export async function updateUsuario(datos: {
  nombre: string
  email: string
  contraseña?: string
  fechaNac?: string
}) {
  const usuario = getUsuario()
  if (!usuario) throw new Error('No hay usuario logueado')

  const res = await fetch(`${API_URL}/Usuario/${usuario.idUsuario}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idUsuario: usuario.idUsuario,
      nombre: datos.nombre,
      email: datos.email,
      contraseña: datos.contraseña || usuario.contraseña,
      fechaNac: datos.fechaNac
    })
  })

  if (!res.ok) throw new Error('Error al guardar')

  const actualizado = { ...usuario, ...datos }
  localStorage.setItem('usuario', JSON.stringify(actualizado))
  return actualizado
}
