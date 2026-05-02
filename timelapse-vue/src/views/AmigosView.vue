<template>
  <div class="page">
    <AppHeader variant="app" />

    <main class="page__main page__main--capsulas">
      <h1 class="perfil-header__title">Mis Amigos</h1>

      <section class="capsulas-list">
        <p v-if="amigosStore.cargando">Cargando amigos...</p>

        <p v-else-if="amigosStore.error">{{ amigosStore.error }}</p>

        <p v-else-if="amigosStore.amigos.length === 0">No tienes amigos añadidos todavía.</p>

        <div
          v-else
          v-for="amigo in amigosStore.amigos"
          :key="amigo.idUsuario"
          class="capsula-item"
        >
          <img src="@/assets/img/Perfil.png" alt="Amigo" class="card__profile-img" />
          <div class="capsula-item__content">
            <h3 class="capsula-item__title">{{ amigo.nombre }}</h3>
            <p class="capsula-item__date">{{ amigo.email }}</p>
          </div>
        </div>
      </section>
    </main>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import { useAmigosStore } from '@/stores/useAmigosStore'

const amigosStore = useAmigosStore()

onMounted(() => {
  amigosStore.cargarAmigos()
})
</script>