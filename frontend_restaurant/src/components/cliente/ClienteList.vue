<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const clientes = ref<Cliente[]>([])

async function getClientes() {
  clientes.value = await http.get('clientes').then((res) => res.data)
}

async function eliminar(id: number) {
  if (confirm('¿Eliminar cliente?')) {
    await http.delete(`clientes/${id}`)
    getClientes()
  }
}

function editar(id: number) {
  router.push(`/clientes/editar/${id}`)
}

onMounted(() => getClientes())
</script>

<template>
  <div class="container mt-5">
    <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
      Lista de Clientes
    </h2>
    <RouterLink to="/clientes/crear" class="btn btn-success my-2">
      <font-awesome-icon icon="fa-solid fa-plus" /> Crear Cliente
    </RouterLink>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th style="color: #e49e48">#</th>
            <th style="color: #e49e48">CI</th>
            <th style="color: #e49e48">Nombre</th>
            <th style="color: #e49e48">Celular</th>
            <th style="color: #e49e48">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(cliente, index) in clientes"
            :key="cliente.id"
            style="background-color: black"
          >
            <td style="color: #f8cb2e">{{ index + 1 }}</td>
            <td style="color: #f8cb2e">{{ cliente.cedula_identidad }}</td>
            <td style="color: #f8cb2e">{{ cliente.nombre_completo }}</td>
            <td style="color: #f8cb2e">{{ cliente.celular }}</td>
            <td>
              <button class="btn text-success" @click="editar(cliente.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="eliminar(cliente.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
