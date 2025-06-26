<script setup lang="ts">
import type { Usuario } from '@/models/usuario'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const ENDPOINT = 'usuarios'
const usuarios = ref<Usuario[]>([])

async function getUsuarios() {
  usuarios.value = await http.get(ENDPOINT).then(res => res.data)
}

function toEdit(id: number) {
  router.push(`/usuarios/editar/${id}`)
}

async function toDelete(id: number) {
  const confirmar = confirm('¿Está seguro que desea eliminar este usuario?')
  if (confirmar) {
    await http.delete(`${ENDPOINT}/${id}`)
    await getUsuarios()
  }
}

onMounted(() => {
  getUsuarios()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Usuarios</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Usuarios</h2>
      <div class="col-12 mb-3">
        <RouterLink to="/usuarios/crear" class="btn btn-success">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th style="color: #e49e48">N°</th>
            <th style="color: #e49e48">Usuario</th>
            <th style="color: #e49e48">Rol</th>
            <th style="color: #e49e48">Empleado</th>
            <th style="color: #e49e48">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) in usuarios" :key="usuario.id" style="background-color: black">
            <th style="color: #f8cb2e">{{ index + 1 }}</th>
            <td style="color: #f8cb2e">{{ usuario.usuario_login }}</td>
            <td style="color: #f8cb2e">{{ usuario.rol }}</td>
            <td style="color: #f8cb2e">
              {{ usuario.empleado?.nombres }} {{ usuario.empleado?.primer_apellido }} {{ usuario.empleado?.segundo_apellido }}
            </td>
            <td>
              <button class="btn text-success" @click="toEdit(usuario.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(usuario.id)">
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
