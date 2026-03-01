import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAmigosByUsuario, type AmigoPerfil } from '@/services/amistad'
import { useAuthStore } from '@/stores/useAuthStore'

export const useAmigosStore = defineStore('amigos', () => {
  const amigos = ref<AmigoPerfil[]>([])
  const cargando = ref(false)
  const error = ref<string | null>(null)

  async function cargarAmigos() {
    const authStore = useAuthStore()
    const idUsuario = authStore.usuario?.idUsuario
    if (!idUsuario) {
      error.value = 'No hay usuario autenticado'
      return
    }

    cargando.value = true
    error.value = null

    try {
      amigos.value = await getAmigosByUsuario(idUsuario)
    } catch (e: any) {
      error.value = e.message ?? 'Error desconocido'
    } finally {
      cargando.value = false
    }
  }

  return { amigos, cargando, error, cargarAmigos }
})