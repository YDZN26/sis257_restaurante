<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import http from '@/plugins/axios'

const ENDPOINT = 'empleados'
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const cedula_identidad = ref('')
const celular = ref('')
const nombres = ref('')
const primer_apellido = ref('')
const segundo_apellido = ref('')
const direccion = ref('')
const cargo = ref('')

async function getEmpleado() {
  const data = await http.get(`${ENDPOINT}/${id}`).then(res => res.data)
  cedula_identidad.value = data.cedula_identidad
  celular.value = data.celular
  nombres.value = data.nombres
  primer_apellido.value = data.primer_apellido
  segundo_apellido.value = data.segundo_apellido
  direccion.value = data.direccion
  cargo.value = data.cargo
}

async function actualizarEmpleado() {
  try {
    await http.put(`${ENDPOINT}/${id}`, {
      cedula_identidad: cedula_identidad.value,
      celular: celular.value,
      nombres: nombres.value,
      primer_apellido: primer_apellido.value,
      segundo_apellido: segundo_apellido.value,
      direccion: direccion.value,
      cargo: cargo.value
})
    router.push('/empleados')
  } catch (error) {
    console.error('Error al actualizar:', error)
    alert('No se pudo actualizar el empleado')
  }
}

onMounted(() => {
  getEmpleado()
})
</script>


<template>
  <div class="container mt-4">
    <h2>Editar Empleado</h2>
    <form @submit.prevent="actualizarEmpleado">
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
      <button type="submit" class="btn btn-primary">Guardar Cambios</button>
    </form>
  </div>
</template>
