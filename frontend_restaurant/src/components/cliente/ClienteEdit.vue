<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const id = router.currentRoute.value.params['id']

const cedula_identidad = ref('')
const nombre_completo = ref('')
const celular = ref('')

async function obtenerCliente() {
  try {
    const response = await http.get(`clientes/${id}`)
    cedula_identidad.value = response.data.cedula_identidad
    nombre_completo.value = response.data.nombre_completo
    celular.value = response.data.celular
  } catch (error) {
    console.error('Error al cargar cliente:', error)
    alert('No se pudo cargar el cliente.')
  }
}

async function actualizarCliente() {
  try {
    await http.put(`clientes/${id}`, {
      cedula_identidad: cedula_identidad.value,
      nombre_completo: nombre_completo.value,
      celular: celular.value
    })
    router.push('/clientes')
  } catch (error) {
    console.error('Error al actualizar cliente:', error)
    alert('No se pudo actualizar el cliente.')
  }
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  obtenerCliente()
})
</script>

<template>
  <div class="container mt-5">
    <h2>Editar Cliente</h2>
    <form @submit.prevent="actualizarCliente">
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
          <font-awesome-icon icon="fa-solid fa-save" /> Actualizar
        </button>
        <button type="button" class="btn btn-secondary" @click="goBack">Volver</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}
</style>
