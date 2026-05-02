<template>
  <header class="header header--admin">
    <RouterLink to="/admin">
      <img
        src="@/assets/img/LogoCompletoClaro-removebg-preview.png"
        alt="Timelapse"
        class="header__logo"
      />
    </RouterLink>

    <div class="header__right">
      <RouterLink to="/home" class="header__btn">
        ← Volver a la app
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>