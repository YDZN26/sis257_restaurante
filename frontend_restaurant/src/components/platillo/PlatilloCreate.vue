<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''

const nombre = ref('')
const precio = ref(0)
const tiempoPreparacion = ref(0)
const disponibilidad = ref(0)
const idCategoria = ref<number | null>(null)
const categorias = ref<{ id: number; nombre: string }[]>([])

async function getCategorias() {
  categorias.value = await http.get('categoria_platillos').then(res => res.data)
}

async function crearPlatillo() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      precio: precio.value,
      stock: disponibilidad.value,
      tiempo_preparacion: tiempoPreparacion.value.toString(),
      id_categoria: idCategoria.value,
    })
    .then(() => router.push('/platillos'))
    .catch(error => {
      console.error('Error al crear platillo:', error)
      alert('Error al crear platillo. Revisa los campos o la consola.')
    })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getCategorias()
})
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
                <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
                <li class="breadcrumb-item"><RouterLink to="/platillos">Platillos</RouterLink></li>
                <li class="breadcrumb-item active" aria-current="page">Crear</li>
              </ol>
            </nav>
            <h2>INSERTAR DATOS DEL PLATILLO</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <form @submit.prevent="crearPlatillo">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="nombre" required />
          <label for="nombre">Nombre Platillo</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="precio" placeholder="Precio" required />
          <label for="precio">Precio</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="tiempoPreparacion" placeholder="Tiempo" required />
          <label for="tiempoPreparacion">Tiempo de Preparación</label>
        </div>

        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="disponibilidad" placeholder="Stock" required />
          <label for="disponibilidad">Disponibilidad</label>
        </div>

        <div class="form-floating mb-3">
          <select class="form-select" v-model="idCategoria" required>
            <option value="" disabled>Seleccione una categoría</option>
            <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
              {{ cat.nombre }}
            </option>
          </select>
          <label for="idCategoria">Categoría</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Platillo
          </button>
        </div>
      </form>
    </div>

    <div class="text-left">
      <button class="btn btn-success" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style scoped></style>
