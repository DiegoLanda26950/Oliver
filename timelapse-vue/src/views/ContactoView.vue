<template>
  <!-- Contenedor principal de la página -->
  <div class="page">
    
    <!-- Componente de cabecera, con la variante "app" (estilo de app, no de landing) -->
    <AppHeader variant="app" />

    <!-- Contenido principal de la página -->
    <main class="page__main page__main--contact">
      
      <!-- Tarjeta central donde va todo el contenido de contacto -->
      <section class="card card--contact">
        
        <!-- Título de la página -->
        <h1 class="card__title card__title--contact">
          Contáctanos para poder ayudarte
        </h1>

        <!-- Menú de navegación con las opciones de contacto -->
        <nav class="contact-nav">
          
          <!--
            v-for: recorre el array "contactOptions" y genera un <a> por cada elemento
            :key: identificador único para que Vue gestione los elementos eficientemente
            :href: enlace ancla hacia la sección correspondiente (ej: #reportar, #denunciar...)
          -->
          <a v-for="option in contactOptions" :key="option.id" :href="`#${option.id}`" class="contact-nav__option">
            
            <!-- Icono de la opción (emoji) -->
            <span class="contact-nav__icon">{{ option.icon }}</span>
            
            <!-- Texto de la opción (ej: "Reportar fallo") -->
            {{ option.label }}
            
          </a>
        </nav>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// Importamos el componente de cabecera
import AppHeader from '@/components/AppHeader.vue'


const contactOptions = [
  { id: 'reportar',  icon: '🔧', label: 'Reportar fallo' },
  { id: 'denunciar', icon: '⚠️', label: 'Denunciar usuario' },
  { id: 'trabajo',   icon: '💼', label: 'Trabaja con nosotros' },
  { id: 'sobre',     icon: 'ℹ️', label: 'Sobre nosotros' },
  { id: 'otros',     icon: '📝', label: 'Otros' }
]
</script>