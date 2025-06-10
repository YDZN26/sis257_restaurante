<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Repartidor } from '@/models/repartidor'
import type { Cliente } from '@/models/cliente'
import type { Direccion } from '@/models/direccion'
import type { Platillo } from '@/models/platillo'

var direcciones = ref<Direccion[]>([])
async function getDireccion() {
  direcciones.value = await http.get('direcciones').then((response) => response.data)
}

onMounted(() => {
  getDireccion()
})

var platillos = ref<Platillo[]>([])
async function getPlatillo() {
  platillos.value = await http.get('platillos').then((response) => response.data)
}

onMounted(() => {
  getPlatillo()
})

var clientes = ref<Cliente[]>([])
async function getCliente() {
  clientes.value = await http.get('clientes').then((response) => response.data)
}

onMounted(() => {
  getCliente()
})

var repartidores = ref<Repartidor[]>([])
async function getRepartidor() {
  repartidores.value = await http.get('repartidor').then((response) => response.data)
}

onMounted(() => {
  getRepartidor()
})
const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const cantidad = ref('')
const total = ref('')
const fechaPedido = ref('')
const idRepartidor = ref('')
const idCliente = ref('')
const idPlatillo = ref('')
const idDireccion = ref('')
const id = router.currentRoute.value.params['id']

async function editarPedido() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      cantidad: cantidad.value,
      total: total.value,
      fechaPedido: fechaPedido.value,
      idRepartidor: idRepartidor.value,
      idCliente: idCliente.value,
      idPlatillo: idPlatillo.value,
      idDireccion: idDireccion.value
    })
    .then(() => router.push('/pedido'))
}

async function getPedido() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(cantidad.value = response.data.cantidad),
      (total.value = response.data.total),
      (fechaPedido.value = response.data.fechaPedido),
      (idRepartidor.value = response.data.idRepartidor),
      (idCliente.value = response.data.idCliente),
      (idPlatillo.value = response.data.idPlatillo),
      (idDireccion.value = response.data.idDireccion)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getPedido()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">Inicio</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/pedido">Pedidos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Editar Pedido
        </li>
      </ol>
    </nav>

    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2>EDITAR DATOS DEL PEDIDO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="editarPedido">
        <div class="form-floating mb-3">
          <select v-model="idRepartidor" class="form-select">
            <option v-for="repartidor in repartidores" :value="repartidor.id">
              {{ repartidor.nombreRepartidor }}
            </option>
          </select>
          <label for="repartidor">Nombre del Repartidor</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idCliente" class="form-select">
            <option v-for="cliente in clientes" :value="cliente.id">
              {{ cliente.nombreCliente }}
            </option>
          </select>
          <label for="cliente">Nombre del Cliente</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idDireccion" class="form-select">
            <option v-for="direccion in direcciones" :value="direccion.id">
              {{ direccion.direccion }}
            </option>
          </select>
          <label for="cliente">Dirección</label>
        </div>

        <div class="form-floating mb-3">
          <select v-model="idPlatillo" class="form-select">
            <option v-for="platillo in platillos" :value="platillo.id">
              {{ platillo.nombre }}
            </option>
          </select>
          <label for="cliente">Nombre del Platillo</label>
        </div>

        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            v-model="cantidad"
            placeholder="cantidad"
            required
          />
          <label for="cantidad">Cantidad</label>
        </div>

        <div class="form-floating">
          <input type="number" class="form-control" v-model="total" placeholder="total" required />
          <label for="total">Total</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="date"
            class="form-control"
            v-model="fechaPedido"
            placeholder="fechaPedido"
            required
          />
          <label for="fechaPedido">fecha del Pedido</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Pedido
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-success" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
