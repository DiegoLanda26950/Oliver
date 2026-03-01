<template>
  <div class="page page--admin">
    <AdminHeader />

    <main class="page__main page__main--admin">

      <p v-if="store.loading" class="admin-loading">Cargando...</p>
      <p v-if="store.error" class="admin-error">{{ store.error }}</p>

      <!-- USUARIOS -->
      <section class="card card--admin-panel">
        <div class="admin-panel__header">
          <h2 class="admin-panel__title">Usuarios</h2>
          <span class="admin-panel__count">{{ store.usuarios.length }} en total</span>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Fecha de nacimiento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in store.usuarios" :key="user.idUsuario">
                <td class="admin-table__bold">{{ user.nombre }}</td>
                <td class="admin-table__muted">{{ user.email }}</td>
                <td class="admin-table__muted">{{ formatFecha(user.fechaNac) }}</td>
                <td>
                  <button @click="store.removeUsuario(user.idUsuario)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- CÁPSULAS -->
      <section class="card card--admin-panel">
        <div class="admin-panel__header">
          <h2 class="admin-panel__title">Cápsulas</h2>
          <span class="admin-panel__count">{{ store.capsulas.length }} en total</span>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Creación</th>
                <th>Apertura</th>
                <th>Estado</th>
                <th>Visibilidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cap in store.capsulas" :key="cap.idCapsula">
                <td class="admin-table__bold">{{ cap.titulo }}</td>
                <td class="admin-table__muted admin-table__desc">{{ cap.descripcion }}</td>
                <td class="admin-table__muted">{{ formatFecha(cap.fechaCreacion) }}</td>
                <td class="admin-table__muted">{{ formatFecha(cap.fechaApertura) }}</td>
                <td>
                  <span class="admin-badge" :class="cap.estado === 'abierta' ? 'admin-badge--green' : 'admin-badge--blue'">
                    {{ cap.estado }}
                  </span>
                </td>
                <td>
                  <span class="admin-badge" :class="cap.visibilidad === 'publica' ? 'admin-badge--green' : 'admin-badge--gray'">
                    {{ cap.visibilidad }}
                  </span>
                </td>
                <td>
                  <button @click="store.removeCapsula(cap.idCapsula)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>

    <AdminFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminFooter from '@/components/AdminFooter.vue'
import { useAdminStore } from '@/stores/useAdminStore'

const store = useAdminStore()

function formatFecha(fecha?: string): string {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

onMounted(() => {
  store.fetchUsuarios()
  store.fetchCapsulas()
})
</script>