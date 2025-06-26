<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Cliente } from '@/models/cliente'
import type { Platillo } from '@/models/platillo'
import type { Direccion } from '@/models/direccion'

const hoy = new Date().toISOString().split('T')[0]
const clientes = ref<Cliente[]>([])
const platillos = ref<Platillo[]>([])
const direcciones = ref<Direccion[]>([])

const filtroCliente = ref('')
const mostrarDropdown = ref(false)
const clienteExistente = ref<Cliente | null>(null)
const ci = ref('')
const nombreCompleto = ref('')

const clientesFiltrados = computed(() =>
  clientes.value.filter(c =>
    `${c.cedula_identidad} ${c.nombre_completo}`.toLowerCase().includes(filtroCliente.value.toLowerCase())
  )
)

const modo = ref<'local' | 'delivery'>('local')
const direccionSeleccionada = ref('')
const nuevaDireccion = ref('')

const platillo_id = ref('')
const cantidad = ref(1)
const stockDisponible = ref(0)

const fecha = ref(new Date().toISOString().slice(0, 10))

const detalles = ref<{ platillo: Platillo; cantidad: number }[]>([])
const total = ref(0)
const montoRecibido = ref(0)
const cambio = computed(() => montoRecibido.value - total.value)
const pagoValido = computed(() => montoRecibido.value >= total.value)

function seleccionarClienteDesdeBusqueda(cliente: Cliente) {
  clienteExistente.value = cliente
  ci.value = cliente.cedula_identidad
  nombreCompleto.value = cliente.nombre_completo
  filtroCliente.value = `${cliente.cedula_identidad} - ${cliente.nombre_completo}`
  mostrarDropdown.value = false
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.autocomplete-container')) {
    mostrarDropdown.value = false
  }
}

onMounted(() => {
  getClientes()
  getPlatillos()
  getDirecciones()
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

async function getClientes() {
  clientes.value = await http.get('clientes').then(r => r.data)
}

async function getPlatillos() {
  platillos.value = await http.get('platillos').then(r => r.data)
}

async function getDirecciones() {
  direcciones.value = await http.get('direcciones').then(r => r.data)
}

function actualizarStock() {
  const platillo = platillos.value.find(p => p.id === +platillo_id.value)
  stockDisponible.value = platillo?.stock || 0
  cantidad.value = stockDisponible.value > 0 ? 1 : 0
}

function agregarDetalle() {
  const platillo = platillos.value.find(p => p.id === +platillo_id.value)
  if (!platillo || cantidad.value > platillo.stock || platillo.stock <= 0) return

  const existente = detalles.value.find(d => d.platillo.id === platillo.id)
  if (existente) {
    const nuevaCantidad = existente.cantidad + cantidad.value
    if (nuevaCantidad <= platillo.stock) {
      existente.cantidad = nuevaCantidad
    }
  } else {
    detalles.value.push({ platillo: { ...platillo }, cantidad: cantidad.value })
  }

  platillo.stock -= cantidad.value
  platillo_id.value = ''
  stockDisponible.value = 0
  cantidad.value = 0
  calcularTotal()
}

function quitarDetalle(index: number) {
  const detalle = detalles.value[index]
  const platillo = platillos.value.find(p => p.id === detalle.platillo.id)
  if (platillo) {
    platillo.stock += detalle.cantidad
  }
  detalles.value.splice(index, 1)
  cantidad.value = 0
  calcularTotal()
}

function calcularTotal() {
  total.value = detalles.value.reduce((acc, d) => acc + d.cantidad * d.platillo.precio, 0)
}

async function crearPedido() {
  let cliente_id = clienteExistente.value?.id

  if (!cliente_id) {
    const nuevoCliente = await http.post('clientes', {
      cedula_identidad: ci.value,
      nombre_completo: nombreCompleto.value
    }).then(r => r.data)
    cliente_id = nuevoCliente.id
  }

  let direccion_id = null
  if (modo.value === 'delivery') {
    if (direccionSeleccionada.value !== 'nueva') {
      direccion_id = +direccionSeleccionada.value
    } else {
      const nueva = await http.post('direcciones', {
        id_cliente: cliente_id,
        direccion: nuevaDireccion.value,
        estado: 'activo'
      }).then(r => r.data)
      direccion_id = nueva.id
    }
  }

  const detallesFormateados = detalles.value.map(d => ({
    platillo_id: d.platillo.id,
    cantidad: d.cantidad
  }))

  await http.post('pedidos', {
    id_cliente: cliente_id,
    id_direccion: direccion_id,
    fecha: new Date(),
    total: total.value,
    detalles: detallesFormateados
  })

  router.push('/pedido')
}
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="find-us mb-4">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading">
            <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">
              Crear Nuevo Pedido
            </h2>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="crearPedido">
      <!-- Cliente -->
      <div class="mb-3 position-relative autocomplete-container">
        <label class="form-label fw-bold">Buscar Cliente</label>
        <input
          type="text"
          class="form-control"
          v-model="filtroCliente"
          @focus="mostrarDropdown = true"
          @input="mostrarDropdown = true"
          autocomplete="off"
          placeholder="CI o Nombre del cliente"
        />
        <ul
          v-if="mostrarDropdown"
          class="list-group position-absolute w-100 z-3"
          style="max-height: 200px; overflow-y: auto"
        >
          <li
            class="list-group-item list-group-item-action"
            v-for="c in clientesFiltrados"
            :key="c.id"
            @click="seleccionarClienteDesdeBusqueda(c)"
          >
            {{ c.cedula_identidad }} - {{ c.nombre_completo }}
          </li>
          <li v-if="clientesFiltrados.length === 0" class="list-group-item text-muted">
            Cliente no encontrado. Ingrese manualmente los datos.
          </li>
        </ul>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="ci" required />
        <label>CI</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="nombreCompleto" required />
        <label>Nombre Completo</label>
      </div>

      <!-- Tipo Pedido -->
      <div class="mb-4">
        <label class="form-label fw-bold">Tipo de Pedido</label><br />
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="modo" value="local" />
          <label class="form-check-label">Local</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" v-model="modo" value="delivery" />
          <label class="form-check-label">Delivery</label>
        </div>
      </div>

      <!-- Dirección -->
      <div v-if="modo === 'delivery'" class="mb-3">
        <label class="form-label fw-bold">Dirección:</label>
        <select class="form-select" v-model="direccionSeleccionada">
          <option value="" disabled>Seleccione una dirección</option>
          <option v-for="d in direcciones" :key="d.id" :value="d.id">{{ d.direccion }}</option>
          <option value="nueva">Nueva dirección</option>
        </select>
        <input
          v-if="direccionSeleccionada === 'nueva'"
          v-model="nuevaDireccion"
          type="text"
          class="form-control mt-2"
          placeholder="Ingrese nueva dirección"
        />
      </div>

      <!-- Fecha -->
      <div class="form-floating mb-3">
        <input type="date" class="form-control" v-model="fecha" :max="hoy" required />
        <label>Fecha</label>
      </div>

      <!-- Platillos -->
      <div class="form-floating mb-3">
        <select class="form-select" v-model="platillo_id" @change="actualizarStock">
          <option value="" disabled>Seleccione un platillo</option>
          <option v-for="p in platillos" :key="p.id" :value="p.id" :disabled="p.stock <= 0">
            {{ p.nombre }} (Bs {{ p.precio }}) - Stock: {{ p.stock }}
          </option>
        </select>
        <label>Platillo</label>
      </div>

      <div v-if="stockDisponible > 0" class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          v-model.number="cantidad"
          :max="stockDisponible"
          min="1"
        />
        <label>Cantidad (máx: {{ stockDisponible }})</label>
      </div>

      <div v-else class="alert alert-danger p-2">Este platillo ya no tiene stock disponible.</div>

      <div class="mb-3">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          @click="agregarDetalle"
          :disabled="!platillo_id || cantidad > stockDisponible"
        >
          Agregar al Pedido
        </button>
      </div>

      <!-- Detalles -->
      <div v-if="detalles.length" class="mb-4">
        <h5>Detalle del Pedido</h5>
        <ul class="fw-normal">
          <li
            v-for="(d, index) in detalles"
            :key="index"
            class="mb-1"
            style="color: black; font-weight: bold"
          >
            {{ d.platillo.nombre }} x {{ d.cantidad }} = Bs {{ d.platillo.precio * d.cantidad }}
            <button @click="quitarDetalle(index)" class="btn btn-sm btn-danger ms-2">X</button>
          </li>
        </ul>

        <h6 class="mt-3">Total: <span class="text-primary">Bs {{ total }}</span></h6>
      </div>

      <!-- Pago -->
      <div class="form-floating mb-3">
        <input type="number" class="form-control" v-model.number="montoRecibido" min="0" />
        <label>Monto Recibido</label>
      </div>

      <div class="alert alert-warning" v-if="!pagoValido && montoRecibido">
        Monto insuficiente. Debe ser al menos Bs {{ total }}
      </div>
      <div class="alert alert-success" v-if="pagoValido && cambio > 0">
        Cambio: Bs {{ cambio }}
      </div>

      <!-- Botón -->
      <div class="text-center mt-4">
        <button
          type="submit"
          class="btn btn-primary btn-lg px-4"
          :disabled="!pagoValido || detalles.length === 0"
        >
          <font-awesome-icon icon="fa-solid fa-floppy-disk" class="me-2" />
          Guardar Pedido
        </button>
      </div>
    </form>
  </div>
</template>


<style>
.autocomplete-container {
  z-index: 999;
  position: relative;
}
.z-3 {
  z-index: 1050;
}
</style>
