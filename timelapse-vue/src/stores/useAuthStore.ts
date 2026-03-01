import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getUsuario
} from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  // --- Estado ---
  const usuario = ref(getUsuario()) // Inicializa desde localStorage si ya habia sesion
  const loading = ref(false)
  const error = ref('')

  // --- Getters ---
  const isLoggedIn = computed(() => !!usuario.value)
  const nombre = computed(() => usuario.value?.nombre ?? '')
  const email = computed(() => usuario.value?.email ?? '')

  // --- Acciones ---
  async function login(emailVal: string, password: string) {
    loading.value = true
    error.value = ''
    try {
      usuario.value = await loginService(emailVal, password)
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  async function register(nombreVal: string, emailVal: string, password: string) {
    loading.value = true
    error.value = ''
    try {
      usuario.value = await registerService(nombreVal, emailVal, password)
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    logoutService()
    usuario.value = null
    error.value = ''
  }

  function clearError() {
    error.value = ''
  }

  return { usuario, loading, error, isLoggedIn, nombre, email, login, register, logout, clearError }
})
