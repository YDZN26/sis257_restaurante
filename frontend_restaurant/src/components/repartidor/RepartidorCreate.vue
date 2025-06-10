<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombreRepartidor = ref('')
const carnetIdentidad = ref('')
const fechaEdad = ref('')
const fechaIngreso = ref('')

async function crearRepartidor() {
  await http
    .post(ENDPOINT, {
      nombreRepartidor: nombreRepartidor.value,
      carnetIdentidad: carnetIdentidad.value,
      fechaEdad: fechaEdad.value,
      fechaIngreso: fechaIngreso.value
    })
    .then(() => router.push('/repartidor'))
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
                  <RouterLink to="/repartidor">Repartidor</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>INSERTAR DATOS DEL REPARTIDOR</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="crearRepartidor">
        <!--cuando yo aprete guardar me llma al metodo crearRepartidor-->
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            v-model="nombreRepartidor"
            placeholder="NombreRepartidor"
            required
          />
          <label for="nombreRepartidor">Nombre Completo</label>
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
          <input type="Date" class="form-control" v-model="fechaIngreso" placeholder="Fecha de Ingreso" required />
          <label for="fechaIngreso">Fecha de Ingreso a Trabajar</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Repartidor
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
