<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombreCliente = ref('')
const carnetIdentidad = ref('')
const fechaEdad = ref('')
const celular = ref('')

async function crearCliente() {
  await http
    .post(ENDPOINT, {
      nombreCliente: nombreCliente.value,
      carnetIdentidad: carnetIdentidad.value,
      fechaEdad: fechaEdad.value,
      celular: celular.value
    })
    .then(() => router.push('/clientes'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <div class="find-us">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <RouterLink to="/">Inicio</RouterLink>
                </li>
                <li class="breadcrumb-item">
                  <RouterLink to="/clientes">Cliente</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>INSERTAR DATOS DEL CLIENTE</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="crearCliente">
        <!--cuando yo aprete guardar me llma al metodo crearCliente-->
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="nombreCliente"
            placeholder="nombreCliente"
            required
          />
          <label for="nombreCliente">Nombre Completo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="carnetIdentidad"
            placeholder="carnetIdentidad"
            required
          />
          <label for="carnetIdentidad">Carnet de Identidad</label>
        </div>
        <div class="form-floating mb-3">
          <input type="Date" class="form-control" v-model="fechaEdad" placeholder="Edad" required />
          <label for="fechaEdad">Fecha de Nacimiento</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="celular"
            placeholder="celular"
            required
          />
          <label for="celular">Celular</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Cliente
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
