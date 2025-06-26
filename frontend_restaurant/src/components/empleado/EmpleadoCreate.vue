<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const ENDPOINT = 'empleados'

const cedula_identidad = ref('')
const celular = ref('')
const nombres = ref('')
const primer_apellido = ref('')
const segundo_apellido = ref('')
const direccion = ref('')
const cargo = ref('')

async function crearEmpleado() {
  await http.post(ENDPOINT, {
    cedula_identidad: cedula_identidad.value,
    celular: celular.value,
    nombres: nombres.value,
    primer_apellido: primer_apellido.value,
    segundo_apellido: segundo_apellido.value,
    direccion: direccion.value,
    cargo: cargo.value
  })
  router.push('/empleados')
}
</script>

<template>
  <div class="container mt-4">
    <h2>Crear Nuevo Empleado</h2>
    <form @submit.prevent="crearEmpleado">
      <div class="form-floating mb-2">
        <input class="form-control" v-model="cedula_identidad" required />
        <label>Cédula de Identidad</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="celular" required />
        <label>Celular</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="nombres" required />
        <label>Nombres</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="primer_apellido" required />
        <label>Primer Apellido</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="segundo_apellido" />
        <label>Segundo Apellido</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="direccion" />
        <label>Dirección</label>
      </div>
      <div class="form-floating mb-2">
        <input class="form-control" v-model="cargo" required />
        <label>Cargo</label>
      </div>
      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>