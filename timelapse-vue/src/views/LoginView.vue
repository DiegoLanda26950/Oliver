<template>
  <div class="page">
    <AppHeader variant="public" logo-link="/" />
    <main class="page__main page__main--login">
      <section class="card card--login">
        <h1 class="login__title">BIENVENIDO A<br />TIMELAPSE</h1>
        <p class="login__subtitle">Inicia sesión para acceder a tus cápsulas del tiempo</p>

        <form class="form form--login" @submit.prevent="handleLogin">
          <div class="form__group">
            <label class="form__label">Correo electrónico</label>
            <input v-model="email" type="email" class="form__input" placeholder="tu@email.com" required />
          </div>
          <div class="form__group">
            <label class="form__label">Contraseña</label>
            <input v-model="password" type="password" class="form__input" placeholder="••••••••" required />
          </div>

          <p v-if="error" style="color:#C85C5C; font-size:14px; text-align:center">{{ error }}</p>

          <button type="submit" class="btn btn--submit btn--login">
            {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <p class="login__register">
          ¿No tienes cuenta?
          <RouterLink to="/registro" class="link">Regístrate aquí</RouterLink>
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
import { login } from '@/services/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await login(email.value, password.value)
    router.push('/home')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>