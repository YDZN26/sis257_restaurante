<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var pedidos = ref<Pedido[]>([])

async function getPedido() {
  pedidos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/pedido/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el pedido?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPedido())
  }
}

onMounted(() => {
  getPedido()
})
</script>

<template>
  <br /><br /><br />
  <div v-if="authStore.token">
    <div class="find-us">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <RouterLink to="/">Inicio</RouterLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Pedidos</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
                Lista de Pedidos
              </h2>
              <div class="col-12"></div>
            </div>
            <RouterLink to="/pedido/crear">Crear Nuevo Pedido </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr style="background-color: black">
              <th scope="col" style="color: #e49e48">N°</th>
              <th scope="col" style="color: #e49e48">Nombre del Repartidor</th>
              <th scope="col" style="color: #e49e48">Nombre Cliente</th>
              <th scope="col" style="color: #e49e48">Nombre de la Dirección</th>
              <th scope="col" style="color: #e49e48">Nombre del Platillo</th>
              <th scope="col" style="color: #e49e48">Cantidad</th>
              <th scope="col" style="color: #e49e48">Total</th>
              <th scope="col" style="color: #e49e48">Fecha y Hora del Pedido</th>
              <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pedido, index) in pedidos" :key="pedido.id" style="background-color: black">
              <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
              <td style="color: #f8cb2e">{{ pedido.repartidor?.nombreRepartidor }}</td>
              <td style="color: #f8cb2e">{{ pedido.cliente?.nombreCliente }}</td>
              <td style="color: #f8cb2e">{{ pedido.direccion?.direccion }}</td>
              <td style="color: #f8cb2e">{{ pedido.platillo?.nombre }}</td>
              <td style="color: #f8cb2e">{{ pedido.cantidad }}</td>
              <td style="color: #f8cb2e">{{ pedido.total }}</td>
              <td style="color: #f8cb2e">{{ pedido.fechaPedido }}</td>

              <td>
                <button class="btn text-success" @click="toEdit(pedido.id)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn text-danger" @click="toDelete(pedido.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
