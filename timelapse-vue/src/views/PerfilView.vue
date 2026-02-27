<template>
  <div class="page">
    <AppHeader variant="app" />

    <main class="page__main page__main--perfil">
      <section class="card card--perfil">
        <div class="perfil-header">
          <h1 class="perfil-header__title">Perfil</h1>
          <button class="perfil-header__btn" @click="toggleEdit">
            {{ isEditing ? 'Guardar' : 'Editar' }}
          </button>
        </div>

        <div class="perfil-user">
          <div class="perfil-user__avatar">
            <img src="@/assets/img/Perfil.png" alt="Usuario" class="perfil-user__img" />
          </div>
          <h2 class="perfil-user__name">{{ perfil.nombre || 'Usuario' }}</h2>
          <p class="perfil-user__email">{{ perfil.email || 'correousuario@gmail.com' }}</p>
        </div>

        <div class="perfil-form">
          <div class="perfil-form__group">
            <label class="perfil-form__label">Nombre</label>
            <input v-model="perfil.nombre" type="text" class="perfil-form__input" :disabled="!isEditing" />
          </div>
          <div class="perfil-form__group">
            <label class="perfil-form__label">Correo</label>
            <input v-model="perfil.email" type="email" class="perfil-form__input" :disabled="!isEditing" />
          </div>
          <div class="perfil-form__group">
            <label class="perfil-form__label">Contraseña</label>
            <input v-model="perfil.password" type="password" class="perfil-form__input" :disabled="!isEditing" />
          </div>
          <div class="perfil-form__group">
            <label class="perfil-form__label">Fecha Nac.</label>
            <input v-model="perfil.fechaNac" type="date" class="perfil-form__input" :disabled="!isEditing" />
          </div>
        </div>

        <p v-if="error" style="color:#C85C5C; font-size:14px; text-align:center">{{ error }}</p>
        <p v-if="success" style="color:#5CB85C; font-size:14px; text-align:center">Perfil actualizado</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import { getUsuario } from '@/services/auth'
import { updateUsuario } from '@/services/usuario'

const usuario = getUsuario()
const isEditing = ref(false)
const error = ref('')
const success = ref(false)

const perfil = reactive({
  nombre: usuario?.nombre || '',
  email: usuario?.email || '',
  password: '',
  fechaNac: usuario?.fechaNac || ''
})

async function toggleEdit() {
  if (!isEditing.value) {
    isEditing.value = true
    return
  }

  error.value = ''
  success.value = false

  try {
    await updateUsuario({
      nombre: perfil.nombre,
      email: perfil.email,
      contraseña: perfil.password || undefined,
      fechaNac: perfil.fechaNac
    })
    success.value = true
    isEditing.value = false
  } catch (e: any) {
    error.value = e.message
  }
}
</script>