import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  getCapsulasByUsuario,
  crearCapsula,
  eliminarCapsula,
  type Capsula,
  type CrearCapsulaDTO
} from '@/services/capsula'

export const useCapsulaStore = defineStore('capsula', () => {
  // --- Estado ---
  const capsulas = ref<Capsula[]>([])
  const loading = ref(false)
  const error = ref('')

  // --- Acciones ---

  async function fetchCapsulas() {
    const authStore = useAuthStore()
    const idUsuario = authStore.usuario?.idUsuario
    if (!idUsuario) {
      error.value = 'No hay usuario logueado'
      return
    }

    loading.value = true
    error.value = ''
    try {
      capsulas.value = await getCapsulasByUsuario(idUsuario)
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function crear(datos: Omit<CrearCapsulaDTO, 'idUsuario'>) {
    const authStore = useAuthStore()
    const idUsuario = authStore.usuario?.idUsuario
    if (!idUsuario) throw new Error('No hay usuario logueado')

    loading.value = true
    error.value = ''
    try {
      const nueva = await crearCapsula({ ...datos, idUsuario })
      capsulas.value.push(nueva)
      return nueva
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function eliminar(id: number) {
    loading.value = true
    error.value = ''
    try {
      await eliminarCapsula(id)
      capsulas.value = capsulas.value.filter(c => c.idCapsula !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = ''
  }

  return { capsulas, loading, error, fetchCapsulas, crear, eliminar, clearError }
})