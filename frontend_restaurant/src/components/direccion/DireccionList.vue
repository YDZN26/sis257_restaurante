<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from '@/stores/index'
import type { Direccion } from '@/models/direccion'
const authStore = useAuthStore()

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/direccion
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var direccion = ref<Direccion[]>([]) //creamos la variable plural quie tomara loscalores de models/direccion

async function getDireccion() {
  direccion.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/direcciones/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el direccion?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getDireccion())
  }
}

onMounted(() => {
  getDireccion() //esto me llama para que cuando yo entre a direccion me muestre los datos
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
                  <li class="breadcrumb-item active" aria-current="page">Direcciones</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
                Lista de Direcciones
              </h2>
              <div class="col-12"></div>
            </div>
            <RouterLink to="/direcciones/crear">Crear Nuevo Direccion </RouterLink>
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
              <th scope="col" style="color: #e49e48">Nombre del Cliente</th>
              <th scope="col" style="color: #e49e48">Nombre de la dirección</th>
              <th scope="col" style="color: #e49e48">Nombre del piso</th>
              <th scope="col" style="color: #e49e48">indicaciones</th>
              <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(direcciones, index) in direccion"
              :key="direcciones.id"
              style="background-color: black"
            >
              <!--el singular solo es una variable-->
              <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
              <!--cuando el intex comienza en 0 le damos mas 1-->
              <td style="color: #f8cb2e">{{ direcciones.cliente?.nombreCliente }}</td>
              <td style="color: #f8cb2e">{{ direcciones.direccion }}</td>
              <td style="color: #f8cb2e">{{ direcciones.piso }}</td>
              <td style="color: #f8cb2e">{{ direcciones.indicaciones }}</td>

              <td>
                <button class="btn text-success" @click="toEdit(direcciones.id)">
                  <font-awesome-icon icon="fa-solid fa-edit" />
                </button>
                <button class="btn text-danger" @click="toDelete(direcciones.id)">
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
