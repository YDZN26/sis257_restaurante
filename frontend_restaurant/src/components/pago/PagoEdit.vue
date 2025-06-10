<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Repartidor } from '@/models/repartidor'

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
const sueldo = ref('')
const dia = ref('')
const diaExtra = ref('')
const descuento = ref('')
const total = ref('')
const fechaCancelado = ref('')
const idRepartidor = ref('')
const id = router.currentRoute.value.params['id']

async function editarPlatillo() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      sueldo: sueldo.value,
      dia: dia.value,
      diaExtra: diaExtra.value,
      descuento: descuento.value,
      total: total.value,
      fechaCancelado: fechaCancelado.value,
      idRepartidor: idRepartidor.value
    })
    .then(() => router.push('/pago'))
}

async function getPlatillo() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(sueldo.value = response.data.sueldo),
      (dia.value = response.data.dia),
      (diaExtra.value = response.data.diaExtra),
      (descuento.value = response.data.descuento),
      (total.value = response.data.total),
      (fechaCancelado.value = response.data.fechaCancelado),
      (idRepartidor.value = response.data.idRepartidor)
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getPlatillo()
})
</script>

<template>
  <br /><br /><br />
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/pago">Pago</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: black">
          Editar Registro de Pagos
        </li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Registro de Pagos</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarPlatillo">
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="sueldo" placeholder="sueldo" required />
          <label for="sueldo">Total sueldo</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="dia" placeholder="dia" required />
          <label for="dia">Total dia</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="diaExtra"
            placeholder="diaExtra"
            required
          />
          <label for="diaExtra">Total dia Extra</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            v-model="descuento"
            placeholder="descuento"
            required
          />
          <label for="descuento">Total descuento</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="total" placeholder="Total" required />
          <label for="total">Total</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="Date"
            class="form-control"
            v-model="fechaCancelado"
            placeholder="fechaCancelado"
            required
          />
          <label for="fechaCancelado">fecha Cancelado</label>
        </div>
        <div class="form-floating mb-3">
          <select v-model="idRepartidor" class="form-select">
            <option v-for="repartidor in repartidores" :value="repartidor.id">
              {{ repartidor.nombreRepartidor }}
            </option>
          </select>
          <label for="repartidor"> Nombre del Repartidor</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar Registro
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
