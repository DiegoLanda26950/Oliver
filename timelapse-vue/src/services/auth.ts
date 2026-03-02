const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function login(email: string, password: string) {
  // Le preguntamos a la API si existe algún usuario con ese email
  const res = await fetch(`${API_URL}/Usuario/search?email=${email}`)
  const usuarios = await res.json()
  const usuario = usuarios[0] // Cogemos el primero (se asume que el email es único)

  // Si no encontró ningún usuario con ese email, lanzamos un error
  if (!usuario) throw new Error('Usuario no encontrado')

  // Comprobamos la contraseña a mano comparando lo que escribió el usuario con lo que vino de la API
  // Ojo: esto no es lo más seguro, lo ideal sería que el backend hiciera esta comprobación
  if (usuario.contraseña !== password) throw new Error('Contraseña incorrecta')

  // Si todo está bien, guardamos el usuario en localStorage para recordar que está logueado
  localStorage.setItem('usuario', JSON.stringify(usuario))
  return usuario
}

export async function register(nombre: string, email: string, password: string) {
  // Enviamos los datos del nuevo usuario al backend con un POST
  const res = await fetch(`${API_URL}/Usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, contraseña: password }) // Lo convertimos a JSON para enviarlo
  })

  // Si el servidor responde con algún error, lo lanzamos
  if (!res.ok) throw new Error('Error al registrar')

  // Si todo fue bien, guardamos el usuario recién creado en localStorage igual que en el login
  const usuario = await res.json()
  localStorage.setItem('usuario', JSON.stringify(usuario))
  return usuario
}

// Recupera el usuario guardado en localStorage, por ejemplo para saber si hay alguien logueado
// Si no hay nada guardado devuelve null
export function getUsuario() {
  const data = localStorage.getItem('usuario')
  return data ? JSON.parse(data) : null
}

// Cierra la sesión borrando el usuario del localStorage
export function logout() {
  localStorage.removeItem('usuario')
}