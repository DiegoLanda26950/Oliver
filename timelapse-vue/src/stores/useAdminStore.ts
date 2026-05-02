import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAllUsuarios,
  getAllCapsulas,
  deleteUsuario,
  deleteCapsula,
  type Usuario,
  type Capsula
} from '@/services/admin'

export const useAdminStore = defineStore('admin', () => {
  const usuarios = ref<Usuario[]>([])
  const capsulas = ref<Capsula[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchUsuarios() {
    loading.value = true
    error.value = ''
    try {
      usuarios.value = await getAllUsuarios()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCapsulas() {
    loading.value = true
    error.value = ''
    try {
      capsulas.value = await getAllCapsulas()
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function removeUsuario(id: number) {
    error.value = ''
    try {
      await deleteUsuario(id)
      usuarios.value = usuarios.value.filter(u => u.idUsuario !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  async function removeCapsula(id: number) {
    error.value = ''
    try {
      await deleteCapsula(id)
      capsulas.value = capsulas.value.filter(c => c.idCapsula !== id)
    } catch (e: any) {
      error.value = e.message
      throw e
    }
  }

  return { usuarios, capsulas, loading, error, fetchUsuarios, fetchCapsulas, removeUsuario, removeCapsula }
})