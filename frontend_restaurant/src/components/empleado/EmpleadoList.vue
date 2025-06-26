<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const ENDPOINT = 'empleados'
const empleados = ref<Empleado[]>([])

async function getEmpleados() {
  empleados.value = await http.get(ENDPOINT).then((res) => res.data)
}

function toEdit(id: number) {
  router.push(`/empleados/editar/${id}`)
}

async function toDelete(id: number) {
  const confirmacion = confirm('¿Desea eliminar este empleado?')
  if (confirmacion) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getEmpleados())
  }
}

onMounted(() => {
  getEmpleados()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Empleados</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Empleados</h2>
      <div class="col-12 text-end mb-3">
        <RouterLink to="/empleados/crear" class="btn btn-primary">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
</div>

    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th style="color: #e49e48">#</th>
            <th style="color: #e49e48">CI</th>
            <th style="color: #e49e48">Nombre Completo</th>
            <th style="color: #e49e48">Celular</th>
            <th style="color: #e49e48">Dirección</th>
            <th style="color: #e49e48">Cargo</th>
            <th style="color: #e49e48">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(empleado, index) in empleados" :key="empleado.id" style="background-color: black">
            <td style="color: #f8cb2e">{{ index + 1 }}</td>
            <td style="color: #f8cb2e">{{ empleado.cedula_identidad }}</td>
            <td style="color: #f8cb2e">{{ empleado.nombres }} {{ empleado.primer_apellido }} {{ empleado.segundo_apellido }}</td>
            <td style="color: #f8cb2e">{{ empleado.celular }}</td>
            <td style="color: #f8cb2e">{{ empleado.direccion }}</td>
            <td style="color: #f8cb2e">{{ empleado.cargo }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(empleado.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(empleado.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
