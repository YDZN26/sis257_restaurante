<script setup lang="ts">
import { useRoute } from 'vue-router'
const location = useRoute()
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()
</script>

<template>
  <header class="site-header" style="background-color: black">
    <div class="mx-5">
      <div class="col-lg-12 col-12 d-flex flex-wrap">
        <p class="d-flex me-4 mb-0">
          <i class="bi-person custom-icon me-2" style="color: #e49e48"></i>
          <strong style="color: #e49e48"
            >Bienvenido al área de administración del restaurante QUE
            RICO!</strong
          >
        </p>
      </div>
    </div>
  </header>
  <nav
    class="navbar navbar-expand-lg"
    :style="'background-color:' + (location.path != '/' ? 'black ' : '')"
  >
    <div class="mx-5">
      <RouterLink v-if="!authStore.token" to="/login" class="btn custom-btn d-lg-none ms-auto me-4">
        Iniciar Sesión
      </RouterLink>
      <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-none ms-auto me-4">Salir</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5" style="text-align: justify">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link click-scroll">Inicio</RouterLink>
          </li>
          <slot v-if="authStore.token">
            <li class="nav-item">
              <RouterLink to="/clientes" class="nav-link click-scroll">Clientes</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/platillos" class="nav-link click-scroll">Platillos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/pedido" class="nav-link click-scroll">Pedidos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/empleados" class="nav-link click-scroll">Empleados</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link click-scroll" href="#">Hola {{ authStore.user }}</a>
            </li>
          </slot>
        </ul>
        <RouterLink
          v-if="!authStore.token"
          to="/login"
          class="btn custom-btn d-lg-block d-none custom-link"
          style="color: white"
        >
          Iniciar Sesión
        </RouterLink>

        <a
          v-else
          @click="authStore.logout()"
          class="btn custom-btn d-lg-block d-none"
          style="color: white"
          >Salir</a
        >
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
