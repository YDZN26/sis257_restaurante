<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { useAuthStore } from "@/stores/index";
import type { Cliente } from '@/models/cliente';
const authStore = useAuthStore();

const props = defineProps<{
  //esto se copia 7-11
  ENDPOINT_API: string //variable que vien del view/clientes
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var cliente = ref<Cliente[]>([]) //creamos la variable plural quie tomara loscalores de models/clientes

async function getCliente() {
  cliente.value = await http.get(ENDPOINT).then((response) => response.data) //para listar hace get del backend
}

function toEdit(id: number) {
  router.push(`/clientes/editar/${id}`) //me direcciona a la url delswagger depath
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el cliente?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getCliente())
  }
}

onMounted(() => {
  getCliente() //esto me llama para que cuando yo entre a clientes me muestre los datos
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
                  <li class="breadcrumb-item active" aria-current="page">Clientes</li>
                </ol>
              </nav>
              <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Lista de Clientes
              </h2>
              <div class="col-12">
              </div>
            </div>
            <RouterLink  to="/clientes/crear">Crear Nuevo Cliente
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container">
    <div class="table-responsive">
      <!--tablas propias de bottstrap-->
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th scope="col" style="color: #e49e48">N°</th>
            <th scope="col" style="color: #e49e48"> Registro de Clientes</th>
            <th scope="col" style="color: #e49e48">Nombre del Cliente</th>
            <th scope="col" style="color: #e49e48">Carnet</th>
            <th scope="col" style="color: #e49e48">Edad</th>
            <th scope="col" style="color: #e49e48">Celular</th>
            <th scope="col" style="color: #e49e48">Editar/Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clientes, index) in cliente" :key="clientes.id" style="background-color: black">
            <!--el singular solo es una variable-->
            <th scope="row" style="color: #f8cb2e">{{ index + 1 }}</th>
            <!--cuando el intex comienza en 0 le damos mas 1-->
            <td align="center" style="color: #f8cb2e">{{ clientes.id }}</td>
            <td style="color: #f8cb2e">{{ clientes.nombreCliente }}</td>
            <td style="color: #f8cb2e">{{ clientes.carnetIdentidad }}</td>
            <td style="color: #f8cb2e">{{ new Date(clientes.fechaEdad).toLocaleDateString('es-ES') }}</td>
            <td style="color: #f8cb2e">{{ clientes.celular }}</td>
            <td>
              <button class="btn text-success" @click="toEdit(clientes.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn text-danger" @click="toDelete(clientes.id)">
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
