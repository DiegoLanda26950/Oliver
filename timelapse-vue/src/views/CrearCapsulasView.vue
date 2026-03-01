<template>
  <div class="page">
    <AppHeader variant="app" />

    <main class="page__main">
      <section class="card card--form">
        <form class="form" @submit.prevent="handleSubmit">

          <div class="form__group">
            <label for="nombre" class="form__label">Nombre Cápsula:</label>
            <input
              v-model="form.titulo"
              type="text"
              id="nombre"
              class="form__input"
              placeholder="Ej: Verano 2025"
              required
            />
          </div>

          <div class="form__group">
            <label for="descripcion" class="form__label">Descripción:</label>
            <textarea
              v-model="form.descripcion"
              id="descripcion"
              class="form__textarea"
              placeholder="Escribe tus recuerdos..."
              required
            ></textarea>
          </div>

          <div class="form__group">
            <label for="visibilidad" class="form__label">Visibilidad:</label>
            <select v-model="form.visibilidad" id="visibilidad" class="form__input">
              <option value="privada">Privada</option>
              <option value="publica">Pública</option>
            </select>
          </div>

          <div class="form__group">
            <label for="fecha" class="form__label">Fecha de apertura:</label>
            <input
              v-model="form.fechaApertura"
              type="date"
              id="fecha"
              class="form__input"
              required
            />
          </div>

          <p v-if="store.error" style="color:#C85C5C; font-size:14px; text-align:center">
            {{ store.error }}
          </p>

          <hr class="form__separator" />

          <button type="submit" class="btn btn--submit" :disabled="store.loading">
            {{ store.loading ? 'Guardando...' : 'Sellar Cápsula' }}
          </button>
          <RouterLink to="/home" class="btn btn--cancel">Cancelar</RouterLink>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { useCapsulaStore } from '@/stores/useCapsulaStore'

const router = useRouter()
const store = useCapsulaStore()

const form = reactive({
  titulo: '',
  descripcion: '',
  visibilidad: 'privada',
  fechaApertura: ''
})

async function handleSubmit() {
  store.clearError()
  try {
    await store.crear({
      titulo: form.titulo,
      descripcion: form.descripcion,
      fechaCreacion: new Date().toISOString(),
      fechaApertura: new Date(form.fechaApertura).toISOString(),
      estado: 'cerrada',
      visibilidad: form.visibilidad
    })
    router.push('/tus-capsulas')
  } catch {
    // El error queda en store.error y se muestra en el template
  }
}
</script>