<script setup lang="ts">
import type { Usuario } from '@/models/usuario'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const usuarios = ref<Usuario[]>([])

async function getUsuarios() {
  usuarios.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/usuarios/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que desea eliminar el Usuario?')
  if (r) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getUsuarios())
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
        <li class="breadcrumb-item active" aria-current="page" style="color: black">Usuarios</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Usuarios</h2>
      <!-- <div class="col-12">
        <RouterLink to="/usuarios/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div> -->
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48">Registro de Usuarios</th>
            <th scope="col" style="color: #e49e48">Usuario</th>
            <th scope="col" style="color: #e49e48">Email</th>
            <th scope="col" style="color: #e49e48">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) in usuarios" :key="usuario.id" style="background-color: black">
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <td align="center" style="color: #f8cb2e">{{ usuario.id }}</td>
            <td style="color: #f8cb2e">{{ usuario.usuario }}</td>
            <td style="color: #f8cb2e">{{ usuario.email }}</td>
            <td>
              <!-- <button class="btn text-success" @click="toEdit(usuario.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button> -->
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
