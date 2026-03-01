<template>
  <div class="page">
    <AppHeader variant="app" />

    <main class="page__main page__main--capsulas">
      <p v-if="store.loading" style="text-align:center; color:#697C9F">Cargando cápsulas...</p>

      <p v-else-if="store.error" style="text-align:center; color:#C85C5C">
        {{ store.error }}
      </p>

      <p v-else-if="store.capsulas.length === 0" style="text-align:center; color:#697C9F">
        No tienes cápsulas aún. ¡Crea una!
      </p>

      <section v-else class="capsulas-list">
        <CapsuleItem
          v-for="capsula in store.capsulas"
          :key="capsula.idCapsula"
          :title="capsula.titulo"
          :date="formatFecha(capsula.fechaApertura)"
          :to="`/capsula/${capsula.idCapsula}`"
        />
      </section>
    </main>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import CapsuleItem from '@/components/CapsuleItem.vue'
import { useCapsulaStore } from '@/stores/useCapsulaStore'

const store = useCapsulaStore()

onMounted(() => {
  store.fetchCapsulas()
})

function formatFecha(fecha: string): string {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>