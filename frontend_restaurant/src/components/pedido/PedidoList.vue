<script setup lang="ts">
import type { Pedido } from '@/models/pedido'
import { ref, onMounted, computed } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const ENDPOINT = 'pedidos'
const pedidos = ref<Pedido[]>([])
const busqueda = ref('')

const pedidosFiltrados = computed(() => {
  return pedidos.value.filter(p => {
    const texto = busqueda.value.toLowerCase()
    const nombre = p.cliente?.nombre_completo?.toLowerCase() || ''
    const fecha = new Date(p.fecha_creacion).toLocaleDateString('es-BO').toLowerCase()
    return nombre.includes(texto) || fecha.includes(texto)
  })
})


async function getPedidos() {
  const datos = await http.get(ENDPOINT).then(res => res.data)
  // Ordenar por fecha_creacion descendente
  pedidos.value = datos.sort((a: Pedido, b: Pedido) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
}

async function marcarEntregado(id: number) {
  await http.patch(`${ENDPOINT}/entregar/${id}`) // ✅ Correcto
  getPedidos()
}

function formatFecha(fecha: string | Date) {
  const f = new Date(fecha)
  return f.toLocaleString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  getPedidos()
})

const pedidoSeleccionado = ref<Pedido | null>(null)
const mostrarModal = ref(false)

async function verDetalle(id: number) {
  pedidoSeleccionado.value = await http.get(`${ENDPOINT}/${id}`).then(r => r.data)
  mostrarModal.value = true
}

function cerrarModal() {
  mostrarModal.value = false
  pedidoSeleccionado.value = null
}

</script>

<template>
  <div class="d-flex justify-content-center mt-5 mb-3">
  <input
    type="text"
    v-model="busqueda"
    class="form-control"
    placeholder="Buscar por cliente"
    style="width: 60%"
  />
</div>


  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif">Lista de Pedidos</h2>
      <RouterLink to="/pedido/crear" class="btn btn-primary">
        <font-awesome-icon icon="fa-solid fa-plus" /> Nuevo Pedido
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr style="background-color: black">
            <th style="color: #e49e48">#</th>
            <th style="color: #e49e48">Cliente</th>
            <th style="color: #e49e48">Dirección</th>
            <th style="color: #e49e48">Fecha</th>
            <th style="color: #e49e48">Total</th>
            <th style="color: #e49e48">Estado</th>
            <th style="color: #e49e48">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pedido, index) in pedidosFiltrados" :key="pedido.id" style="background-color: black">
            <td style="color: #f8cb2e">{{ index + 1 }}</td>
            <td style="color: #f8cb2e">{{ pedido.cliente?.nombre_completo }}</td>
            <td style="color: #f8cb2e">{{ pedido.direccion?.direccion || '-' }}</td>
            <td style="color: #f8cb2e">{{ formatFecha(pedido.fecha_creacion) }}</td>
            <td style="color: #f8cb2e">Bs {{ pedido.total }}</td>
            <td>
              <span class="badge bg-success" v-if="pedido.estado === 'entregado'">Entregado</span>
              <span class="badge bg-warning text-dark" v-else>Pendiente</span>
            </td>
            <td>
              <button
                v-if="pedido.estado === 'pendiente'"
                class="btn btn-primary btn-sm me-1"
                @click="marcarEntregado(pedido.id)"
              >
                <font-awesome-icon icon="fa-solid fa-check" class="me-1" />
                Entregar
              </button>
              <button class="btn btn-info btn-sm" @click="verDetalle(pedido.id)">
                <font-awesome-icon icon="fa-solid fa-eye" /> Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal detalle -->
    <div v-if="mostrarModal && pedidoSeleccionado" class="modal-backdrop">
      <div class="modal-content p-4 bg-white rounded shadow-lg">
        <h5>Detalle del Pedido</h5>
        <p><strong>Cliente:</strong> {{ pedidoSeleccionado.cliente?.nombre_completo }}</p>
        <p><strong>CI:</strong> {{ pedidoSeleccionado.cliente?.cedula_identidad }}</p>
        <p><strong>Tipo:</strong> {{ pedidoSeleccionado.direccion ? 'Delivery' : 'Local' }}</p>
        <p v-if="pedidoSeleccionado.direccion"><strong>Dirección:</strong> {{ pedidoSeleccionado.direccion.direccion }}</p>
        <p><strong>Fecha:</strong> {{ formatFecha(pedidoSeleccionado.fecha_creacion) }}</p>
        <p><strong>Estado:</strong> {{ pedidoSeleccionado.estado }}</p>
        <hr>
        <h6>Platillos:</h6>
        <ul>
          <li v-for="detalle in pedidoSeleccionado.detallePedidos" :key="detalle.id">
            {{ detalle.platillo?.nombre }} x {{ detalle.cantidad }} = Bs {{ detalle.subtotal }}
          </li>
        </ul>
        <p><strong>Total:</strong> Bs {{ pedidoSeleccionado.total }}</p>
        <div class="text-end">
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
}
</style>
