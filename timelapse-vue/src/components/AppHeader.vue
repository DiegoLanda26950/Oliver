<template>
  <header class="header">
    <RouterLink :to="logoLink">
      <img
        src="@/assets/img/LogoCompletoClaro-removebg-preview.png"
        alt="Timelapse"
        class="header__logo"
      />
    </RouterLink>

    <RouterLink v-if="variant === 'public'" to="/iniciar-sesion" class="header__btn">
      Iniciar sesión
    </RouterLink>

    <div v-if="variant === 'app'" class="header__right">
      <RouterLink v-if="auth.esAdmin" to="/admin" class="header__admin-btn">
        ▦ Admin
      </RouterLink>

      <RouterLink to="/menu">
        <img
          src="@/assets/img/Perfil-removebg-preview.png"
          alt="Perfil"
          class="header__profile"
        />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

interface Props {
  variant?: 'public' | 'app'
  logoLink?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'app',
  logoLink: '/home'
})

const auth = useAuthStore()
</script>