<template>
  <div class="page">
    <!-- Header en modo público, con el logo que lleva a la home al hacer clic -->
    <AppHeader variant="public" logo-link="/" />

    <main class="page__main page__main--login">
      <section class="card card--login">

        <h1 class="login__title">BIENVENIDO A<br />TIMELAPSE</h1>
        <p class="login__subtitle">Inicia sesión para acceder a tus cápsulas del tiempo</p>

        <!-- 
          Al hacer submit no recarga la página gracias al .prevent,
          sino que llama directamente a nuestra función handleLogin
        -->
        <form class="form form--login" @submit.prevent="handleLogin">

          <!-- Campo de email, v-model lo mantiene sincronizado con la variable "email" del script -->
          <div class="form__group">
            <label class="form__label">Correo electrónico</label>
            <input v-model="email" type="email" class="form__input" placeholder="tu@email.com" required />
          </div>

          <!-- Lo mismo pero con la contraseña -->
          <div class="form__group">
            <label class="form__label">Contraseña</label>
            <input v-model="password" type="password" class="form__input" placeholder="••••••••" required />
          </div>

          <!-- Si algo sale mal en el login, aquí aparece el mensaje de error en rojo -->
          <p v-if="error" style="color:#C85C5C; font-size:14px; text-align:center">{{ error }}</p>

          <!-- 
            Mientras espera la respuesta del servidor muestra "Cargando..."
            y cuando termina vuelve a "Iniciar sesión"
          -->
          <button type="submit" class="btn btn--submit btn--login">
            {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
          </button>

        </form>

        <!-- Enlace para ir al registro si el usuario no tiene cuenta -->
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
import { login } from '@/services/auth' // La función que se conecta con el backend para autenticar

const router = useRouter() // Lo usamos para navegar entre páginas por código
const email = ref('')      // Lo que el usuario escribe en el campo de email
const password = ref('')   // Lo que escribe en el campo de contraseña
const loading = ref(false) // Controla si mostrar "Cargando..." o no
const error = ref('')      // Si hay un error, aquí guardamos el mensaje para mostrarlo

async function handleLogin() {
  loading.value = true  // Activamos el "Cargando..." mientras esperamos
  error.value = ''      // Limpiamos cualquier error anterior

  try {
    await login(email.value, password.value) // Llamamos al backend con el email y contraseña
    router.push('/home') // Si todo va bien, mandamos al usuario a la home
  } catch (e: any) {
    error.value = e.message // Si algo falla, guardamos el error para mostrarlo en pantalla
  } finally {
    loading.value = false // Tanto si va bien como si falla, quitamos el "Cargando..."
  }
}
</script>