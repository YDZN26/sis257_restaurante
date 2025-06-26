<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import http from '@/plugins/axios'
import type { Pedido } from '@/models/pedido'
import type { Cliente } from '@/models/cliente'
import type { Direccion } from '@/models/direccion'
import type { Platillo } from '@/models/platillo'

const route = useRoute()
const router = useRouter()
const ENDPOINT = 'pedidos'
const id = route.params.id

const pedido = ref<Pedido | null>(null)
const clientes = ref<Cliente[]>([])
const direcciones = ref<Direccion[]>([])
const platillos = ref<Platillo[]>([])

const cliente_id = ref<number>()
const direccion_id = ref<number>()
const estado = ref(false)

const seleccionados = ref<{ platillo_id: number; cantidad: number }[]>([])
const total = ref(0)

function calcularTotal() {
  total.value = seleccionados.value.reduce((acum, s) => {
    const platillo = platillos.value.find(p => p.id === s.platillo_id)
    return platillo ? acum + platillo.precio * s.cantidad : acum
  }, 0)
}

async function getDataInicial() {
  const resPedido = await http.get(`${ENDPOINT}/${id}`).then(r => r.data)
  pedido.value = resPedido
  cliente_id.value = resPedido.cliente.id
  direccion_id.value = resPedido.direccion?.id
  estado.value = resPedido.estado

  seleccionados.value = resPedido.detallePedidos.map((d: any) => ({
    platillo_id: d.platilloId,
    cantidad: d.cantidad
  }))
  calcularTotal()
}

async function cargarOpciones() {
  clientes.value = await http.get('clientes').then(r => r.data)
  direcciones.value = await http.get('direcciones').then(r => r.data)
  platillos.value = await http.get('platillos').then(r => r.data)
}

function cambiarCantidad(index: number, nuevaCantidad: number) {
  seleccionados.value[index].cantidad = nuevaCantidad
  calcularTotal()
}

function marcarEntregado() {
  estado.value = true
}

async function guardarCambios() {
  await http.patch(`${ENDPOINT}/${id}`, {
    cliente_id: cliente_id.value,
    direccion_id: direccion_id.value,
    estado: estado.value,
    total: total.value,
    detalles: seleccionados.value
  })
  router.push('/pedido')
}

onMounted(async () => {
  await cargarOpciones()
  await getDataInicial()
})
</script>

<template>
  <div class="container">
    <h2>Editar Pedido</h2>

    <form @submit.prevent="guardarCambios">
      <div class="form-floating mb-2">
        <select class="form-control" v-model="cliente_id" required>
          <option disabled value="">Seleccione un cliente</option>
          <option v-for="c in clientes" :key="c.id" :value="c.id">
            {{ c.nombre_completo }}
          </option>
        </select>
        <label>Cliente</label>
      </div>

      <div class="form-floating mb-2">
        <select class="form-control" v-model="direccion_id" required>
          <option disabled value="">Seleccione una dirección</option>
          <option v-for="d in direcciones" :key="d.id" :value="d.id">
            {{ d.direccion }}
          </option>
        </select>
        <label>Dirección</label>
      </div>

      <h4 class="mt-4">Platillos</h4>
      <div v-for="(sel, index) in seleccionados" :key="index" class="mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <span>
            {{
              platillos.find(p => p.id === sel.platillo_id)?.nombre || 'Platillo no encontrado'
            }}
          </span>
          <input
            type="number"
            min="1"
            class="form-control w-25"
            v-model.number="sel.cantidad"
            @input="cambiarCantidad(index, sel.cantidad)"
          />
        </div>
      </div>

      <div class="mt-4">
        <strong>Total:</strong> Bs. {{ total.toFixed(2) }}
      </div>

      <div class="form-check mt-3">
        <input class="form-check-input" type="checkbox" v-model="estado" />
        <label class="form-check-label">Pedido entregado</label>
      </div>

      <div class="mt-3">
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <button type="button" class="btn btn-success ms-2" @click="marcarEntregado" v-if="!estado">
          Marcar como Entregado
        </button>
      </div>
    </form>
  </div>
</template>



<style></style>
