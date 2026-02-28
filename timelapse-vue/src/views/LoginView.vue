<template>
  <div class="page">
    <AppHeader variant="public" logo-link="/" />

    <main class="page__main page__main--login">
      <section class="card card--login">

        <h1 class="login__title">BIENVENIDO A<br />TIMELAPSE</h1>
        <p class="login__subtitle">Inicia sesion para acceder a tus capsulas del tiempo</p>

        <form class="form form--login" @submit.prevent="handleLogin">
          <div class="form__group">
            <label class="form__label">Correo electronico</label>
            <input v-model="email" type="email" class="form__input" placeholder="tu@email.com" required />
          </div>
          <div class="form__group">
            <label class="form__label">Contrasena</label>
            <input v-model="password" type="password" class="form__input" placeholder="..." required />
          </div>

          <p v-if="auth.error" style="color:#C85C5C; font-size:14px; text-align:center">
            {{ auth.error }}
          </p>

          <button type="submit" class="btn btn--submit btn--login" :disabled="auth.loading">
            {{ auth.loading ? 'Cargando...' : 'Iniciar sesion' }}
          </button>
        </form>

        <p class="login__register">
          No tienes cuenta?
          <RouterLink to="/registro" class="link">Registrate aqui</RouterLink>
        </p>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  auth.clearError()
  try {
    await auth.login(email.value, password.value)
    router.push('/home')
  } catch {
    // El error ya queda en auth.error, no hace falta hacer nada aqui
  }
}
</script>