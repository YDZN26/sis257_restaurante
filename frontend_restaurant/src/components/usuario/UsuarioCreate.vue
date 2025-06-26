<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const usuario_login = ref('')
const clave = ref('')
const rol = ref('')
const empleado_id = ref<number | null>(null)

const roles = ['administrador', 'cajero', 'repartidor']
const empleados = ref<{ id: number; nombres: string; primer_apellido: string }[]>([])

async function crearUsuario() {
  await http.post('usuarios', {
    usuario_login: usuario_login.value,
    clave: clave.value,
    rol: rol.value,
    empleado: { id: empleado_id.value }
  }).then(() => router.push('/usuarios'))
}

async function cargarEmpleados() {
  empleados.value = await http.get('empleados').then(res => res.data)
}

onMounted(() => {
  cargarEmpleados()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/usuarios">Usuarios</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Crear Usuario</li>
      </ol>
    </nav>

    <h2>Crear Nuevo Usuario</h2>

    <form @submit.prevent="crearUsuario">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" v-model="usuario_login" placeholder="Usuario" required />
        <label>Usuario</label>
      </div>

      <div class="form-floating mb-3">
        <input type="password" class="form-control" v-model="clave" placeholder="Contraseña" required />
        <label>Contraseña</label>
      </div>

      <div class="form-floating mb-3">
        <select class="form-select" v-model="rol" required>
          <option disabled value="">Seleccione un rol</option>
          <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
        </select>
        <label>Rol</label>
      </div>

      <div class="form-floating mb-3">
        <select class="form-select" v-model="empleado_id" required>
          <option disabled value="">Seleccione un empleado</option>
          <option v-for="e in empleados" :key="e.id" :value="e.id">
            {{ e.nombres }} {{ e.primer_apellido }}
          </option>
        </select>
        <label>Empleado</label>
      </div>

      <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary btn-lg">Crear Usuario</button>
      </div>
    </form>

    <div class="text-left mt-2">
      <button class="btn btn-link" @click="router.go(-1)">Volver</button>
    </div>
  </div>
</template>


<style></style>
