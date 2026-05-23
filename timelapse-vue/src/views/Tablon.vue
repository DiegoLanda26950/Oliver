<template>
  <div class="page">
    <AppHeader variant="app" />

    <main class="page__main">

      <!-- Formulario -->
      <section class="card">
        <form class="form" @submit.prevent="handleSubmit">
          <textarea
            v-model="texto"
            class="form__textarea"
            placeholder="¿Qué estás pensando?"
            required
          ></textarea>
          <button type="submit" class="btn btn--submit">Publicar</button>
        </form>
      </section>

      <!-- Comentarios -->
      <section class="capsulas-list">
        <div
          v-for="c in store.comentarios"
          :key="c.idComentario"
          class="card"
          style="text-align:left; display:flex; flex-direction:column; gap:8px"
        >
          <p style="font-weight:600; color:#183263">{{ getNombre(c.idUsuario) }}</p>
          <p style="color:#3A4156">{{ c.texto }}</p>
          <p style="color:#697C9F; font-size:13px">{{ formatFecha(c.fechaComentario) }}</p>
          <button
            v-if="c.idUsuario === auth.usuario?.idUsuario"
            @click="store.eliminar(c.idComentario)"
            class="btn btn--cancel"
          >Eliminar</button>
        </div>
      </section>

    </main>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'
import { useComentarioStore } from '@/stores/useComentarioStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { getAllUsuarios } from '@/services/admin'

const store = useComentarioStore()
const auth = useAuthStore()
const texto = ref('')
const usuarios = ref<{ idUsuario: number; nombre: string }[]>([])

onMounted(async () => {
  await store.fetchComentarios()
  usuarios.value = await getAllUsuarios()
})

function getNombre(idUsuario: number) {
  return usuarios.value.find(u => u.idUsuario === idUsuario)?.nombre ?? 'Usuario'
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function handleSubmit() {
  if (!texto.value.trim()) return
  await store.crear(texto.value.trim())
  texto.value = ''
}
</script>