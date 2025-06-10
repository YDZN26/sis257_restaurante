<script setup lang="ts">
import type { Detalle } from '@/models/detalle'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/detalle
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var detalles = ref<Detalle[]>([]) //creamos la variable plural quie tomara loscalores de models/detalles

async function getDetalles() {
  detalles.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/detalles/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el detalle?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getDetalles())
  }
}

onMounted(() => {
  getDetalles() //esto me llama para que cuando yo entre a detalles me muestre los datos
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
                Lista de Detalles
              </h2>
              <div class="col-12"></div>
            </div>
            <RouterLink to="/detalles/crear">Crear Nuevo Detalle </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="table-responsive">
        <!--tablas propias de bottstrap-->
        <table class="table table-bordered">
          <thead>
            <tr style="background-color: black">
              <th scope="col" style="color: #e49e48">N°</th>
              <th scope="col" style="color: #e49e48">Detalles en Orden</th>
              <th scope="col" style="color: #e49e48">Nombre del Cliente</th>
              <th scope="col" style="color: #e49e48">Fecha del Pedido</th>
              <th scope="col" style="color: #e49e48">Estado de la Dirección</th>
              <th scope="col" style="color: #e49e48">Puntuación</th>
              <th scope="col" style="color: #e49e48">Credibilidad</th>
              <th scope="col" style="color: #e49e48">Amabilidad</th>
              <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(detalle, index) in detalles"
              :key="detalle.id"
              style="background-color: black"
            >
              <!--el singular solo es una variable-->
              <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
              <!--cuando el intex comienza en 0 le damos mas 1-->
              <td align="center" style="color: #f8cb2e">{{ detalle.id }}</td>
              <td style="color: #f8cb2e">{{ detalle.clientes.nombreCliente }}</td>
              <td style="color: #f8cb2e">{{ detalle.pedidos.fechaPedido }}</td>
              <td style="color: #f8cb2e">{{ detalle.direccionEstado }}</td>
              <td style="color: #f8cb2e">{{ detalle.puntuacion }}</td>
              <td style="color: #f8cb2e">{{ detalle.credibilidad }}</td>
              <td style="color: #f8cb2e">{{ detalle.amabilidad }}</td>
              <td>
                <button class="btn text-success" @click="toEdit(detalle.id)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn text-danger" @click="toDelete(detalle.id)">
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
