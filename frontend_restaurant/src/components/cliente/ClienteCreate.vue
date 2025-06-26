<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const cedula_identidad = ref('')
const nombre_completo = ref('')
const celular = ref('')

async function crearCliente() {
  try {
    await http.post('clientes', {
      cedula_identidad: cedula_identidad.value,
      nombre_completo: nombre_completo.value,
      celular: celular.value
    })
    router.push('/clientes')
  } catch (error) {
    console.error('Error al crear cliente:', error)
    alert('Ocurrió un error al guardar el cliente.')
  }
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container mt-5">
    <h2>Crear Cliente</h2>
    <form @submit.prevent="crearCliente">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          v-model="cedula_identidad"
          placeholder="CI"
          required
        />
        <label>Cédula de Identidad</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          v-model="nombre_completo"
          placeholder="Nombre"
          required
        />
        <label>Nombre Completo</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          v-model="celular"
          placeholder="Celular"
          required
        />
        <label>Celular</label>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">
          <font-awesome-icon icon="fa-solid fa-save" /> Guardar
        </button>
        <button class="btn btn-secondary" @click.prevent="goBack">Volver</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>

