import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllComentarios, crearComentario, eliminarComentario, type Comentario } from '@/services/comentario'
import { useAuthStore } from '@/stores/useAuthStore'

export const useComentarioStore = defineStore('comentario', () => {
  const comentarios = ref<Comentario[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchComentarios() {
    loading.value = true
    error.value = ''
    try {
      comentarios.value = await getAllComentarios()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function crear(texto: string) {
    const auth = useAuthStore()
    if (!auth.usuario?.idUsuario) throw new Error('No hay usuario logueado')
    error.value = ''
    try {
      const nuevo = await crearComentario({ texto, idUsuario: auth.usuario.idUsuario })
      comentarios.value.unshift(nuevo)
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  async function eliminar(id: number) {
    error.value = ''
    try {
      await eliminarComentario(id)
      comentarios.value = comentarios.value.filter(c => c.idComentario !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  return { comentarios, loading, error, fetchComentarios, crear, eliminar }
})