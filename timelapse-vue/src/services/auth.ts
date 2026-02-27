const API_URL = 'https://localhost:7171/api'

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/Usuario/search?email=${email}`)
  const usuarios = await res.json()
  const usuario = usuarios[0]

  if (!usuario) throw new Error('Usuario no encontrado')
  if (usuario.contraseña !== password) throw new Error('Contraseña incorrecta')

  localStorage.setItem('usuario', JSON.stringify(usuario))
  return usuario
}

export async function register(nombre: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/Usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, contraseña: password })
  })

  if (!res.ok) throw new Error('Error al registrar')

  const usuario = await res.json()
  localStorage.setItem('usuario', JSON.stringify(usuario))
  return usuario
}

export function getUsuario() {
  const data = localStorage.getItem('usuario')
  return data ? JSON.parse(data) : null
}

export function logout() {
  localStorage.removeItem('usuario')
}