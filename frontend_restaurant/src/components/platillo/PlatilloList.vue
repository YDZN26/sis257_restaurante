<script setup lang="ts">
import type { Platillo } from '@/models/platillo'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from "@/stores/index";
const authStore = useAuthStore();

const props = defineProps<{//esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/platillo
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var platillos = ref<Platillo[]>([]) //creamos la variable plural quie tomara loscalores de models/platillos

async function getPlatillos() {
  platillos.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/platillos/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el platillo?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getPlatillos())
  }
}

onMounted(() => {
  getPlatillos() //esto me llama para que cuando yo entre a platillos me muestre los datos
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
                  <li class="breadcrumb-item active" aria-current="page">Platillos</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Lista de Platillos
              </h2>
              <div class="col-12">
              </div>
            </div>
            <RouterLink  to="/platillos/crear">Crear Nuevo Platilo
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container">
    <div class="table-responsive">
      <table class="table table-bordered" >
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48">Orden de Creacion</th>
            <th scope="col" style="color: #e49e48">Nombre del Platillo</th>
            <th scope="col" style="color: #e49e48">url del Platillo</th>
            <th scope="col" style="color: #e49e48">Precio</th>
            <th scope="col" style="color: #e49e48">Tiempo de Preparación</th>
            <th scope="col" style="color: #e49e48">Disponibilidad</th>
            <th scope="col" style="color: #E49E48;">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(platillo, index) in platillos.values()"
            :key="platillo.id"
            style="background-color: black"
          >
            <!--el singular solo es una variable-->
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td align="center" style="color: #F8CB2E;">{{ platillo.id }}</td>
            <td style="color: #f8cb2e">{{ platillo.nombre }}</td>
            <td style="color: #f8cb2e">{{ platillo.urlPlatillo }}</td>
            <td style="color: #f8cb2e">{{ platillo.precio }}</td>
            <td style="color: #f8cb2e">{{ platillo.tiempoPreparacion }}</td>
            <td style="color: #f8cb2e">{{ platillo.disponibilidad }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(platillo.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(platillo.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="find-us">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
              VISTA DE LOS PLATILLOS DISPONIBLES
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="p in platillos" class="col-md-4">
        <div class="product-item">
          <a href="#">
            <img :src="p.urlPlatillo" alt="Platillo"
              style="width: 232px; height: 232px; border: 1px solid black; border-radius: 10px;">
          </a>
          <div v-if="p.disponibilidad >= 1" >
            <div class="down-content">
              <a href="/platillos/crear">
                <h4>{{ p.nombre }}</h4>
              </a>
              <h6>Bs{{ p.precio }}</h6>
              <h7>DISPONIBLE en </h7>
              <h8>{{ p.tiempoPreparacion }} min</h8>
              <br><br><br>
            </div>
          </div>

          <div v-else>
            <div class="down-content">
              <a href="/platillos/crear">
                <h4 ><del> {{ p.nombre }}</del></h4>
              </a>
              <h6>Bs{{ p.precio }}</h6>
              <p></p>
              <h4>PLATILLO</h4>
              <h4>NO DISPONIBLE</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
