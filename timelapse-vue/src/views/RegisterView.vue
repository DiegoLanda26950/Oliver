<template>
  <div class="page">
    <AppHeader variant="public" logo-link="/" />
    <main class="page__main">
      <section class="card card--form">
        <h1 class="card__title card__title--main">CREAR CUENTA</h1>

        <form class="form" @submit.prevent="handleRegister">
          <div class="form__group">
            <label class="form__label">Nombre completo</label>
            <input v-model="nombre" type="text" class="form__input" placeholder="Ej: Juan Pérez" required />
          </div>
          <div class="form__group">
            <label class="form__label">Correo electrónico</label>
            <input v-model="email" type="email" class="form__input" placeholder="ejemplo@correo.com" required />
          </div>
          <div class="form__group">
            <label class="form__label">Contraseña</label>
            <input v-model="password" type="password" class="form__input" placeholder="Mínimo 8 caracteres" required />
          </div>
          <div class="form__group">
            <label class="form__label">Confirmar contraseña</label>
            <input v-model="confirmPassword" type="password" class="form__input" placeholder="Repite tu contraseña" required />
          </div>

          <p v-if="auth.error" style="color:#C85C5C; font-size:14px; text-align:center">
            {{ auth.error }}
          </p>

          <button type="submit" class="btn btn--submit" :disabled="auth.loading">
            {{ auth.loading ? 'Cargando...' : 'Registrarse' }}
          </button>
          <RouterLink to="/" class="btn btn--cancel">Cancelar</RouterLink>
        </form>

        <p class="welcome__text" style="margin-top:20px">
          ¿Ya tienes cuenta?
          <RouterLink to="/iniciar-sesion" class="link">Inicia sesión</RouterLink>
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const nombre = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

async function handleRegister() {
  auth.clearError()

  if (password.value !== confirmPassword.value) {
    // Esta validación es local, no necesita el store
    return alert('Las contraseñas no coinciden')
  }

  try {
    await auth.register(nombre.value, email.value, password.value)
    router.push('/home')
  } catch {
    // El error ya queda en auth.error, se muestra en el template
  }
}
</script>