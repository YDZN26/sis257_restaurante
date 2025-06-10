<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Cliente } from '@/models/cliente'

var cliente = ref<Cliente[]>([])
async function getCliente() {
  cliente.value = await http.get('clientes').then((response) => response.data)
}

onMounted(() => {
  getCliente()
})

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const direccion = ref('')
const piso = ref('')
const indicaciones = ref('')
const estado = ref('')
const idCliente = ref('')
const id = router.currentRoute.value.params['id']

async function editarValoracion() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      direccion: direccion.value,
      piso: piso.value,
      indicaciones: indicaciones.value,
      estado: estado.value,
      idCliente: idCliente.value
    })
    .then(() => router.push('/direcciones'))
}

async function getValoracion() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(direccion.value = response.data.direccion),
      (piso.value = response.data.piso),
      (indicaciones.value = response.data.indicaciones),
      (estado.value = response.data.estado),
      (idCliente.value = response.data.idCliente)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getValoracion()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/direcciones">Direcciones</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Editar Dirección
        </li>
      </ol>
    </nav>

    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>EDITAR DATOS DE LA DIRECCIÓN</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="editarValoracion">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="direccion"
            placeholder="direccion"
            required
          />
          <label for="direccion">Dirección</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="piso" placeholder="piso" required />
          <label for="piso">Piso</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="indicaciones"
            placeholder="indicaciones"
            required
          />
          <label for="indicaciones">Indicaciones</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="estado" placeholder="estado" required />
          <label for="estado">Estado</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idCliente" class="form-select">
            <option v-for="clientes in cliente" :value="clientes.id">
              {{ clientes.nombreCliente }}
            </option>
          </select>
          <label for="cliente">Nombre del Cliente</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Valoración
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
