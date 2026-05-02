<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__logo">⏳ Timelapse</router-link>

    <div class="navbar__links">
      <router-link to="/"         class="navbar__link">Inicio</router-link>
      <router-link to="/capsulas" class="navbar__link">Mis cápsulas</router-link>
      <router-link to="/amigos"   class="navbar__link">Amigos</router-link>

      <router-link v-if="auth.esAdmin" to="/admin" class="navbar__link navbar__link--admin">
        ▦ Admin
      </router-link>
    </div>

    <div class="navbar__user" v-if="auth.isLoggedIn">
      <span class="navbar__username">{{ auth.nombre }}</span>
      <button class="navbar__logout" @click="auth.logout()">Salir</button>
    </div>

    <div v-else class="navbar__user">
      <router-link to="/login" class="navbar__link">Iniciar sesión</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()
</script>
