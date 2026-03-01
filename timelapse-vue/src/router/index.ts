import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const routes: RouteRecordRaw[] = [
  { path: '/',               name: 'Index',       component: () => import('@/views/IndexView.vue') },
  { path: '/iniciar-sesion', name: 'Login',        component: () => import('@/views/LoginView.vue') },
  { path: '/registro',       name: 'Register',     component: () => import('@/views/RegisterView.vue') },
  { path: '/home',           name: 'Home',         component: () => import('@/views/HomeView.vue') },
  { path: '/menu',           name: 'Menu',         component: () => import('@/views/MenuView.vue') },
  { path: '/perfil',         name: 'Perfil',       component: () => import('@/views/PerfilView.vue') },
  { path: '/tus-capsulas',   name: 'TusCapsulas',  component: () => import('@/views/TusCapsulaView.vue') },
  { path: '/crear-capsula',  name: 'CrearCapsula', component: () => import('@/views/CrearCapsulasView.vue') },
  { path: '/contacto',       name: 'Contacto',     component: () => import('@/views/ContactoView.vue') },
  { path: '/amigos',         name: 'Amigos',       component: () => import('@/views/AmigosView.vue') },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (!to.meta.requiresAdmin) return true

  const auth = useAuthStore()
  if (!auth.isLoggedIn) return { name: 'Login' }
  if (!auth.esAdmin)    return { name: 'Home' }

  return true
})

export default router