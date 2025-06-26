import type { Cliente } from './cliente'
import type { Direccion } from './direccion'
import type { Platillo } from './platillo'

export interface DetallePedido {
  id: number
  platillo: Platillo
  cantidad: number
  precio_unitario: number
  subtotal: number
}

export interface Pedido {
  id: number
  clienteId: number
  direccionId: number
  total: number
  fecha: string
  estado: string                // era boolean, debe ser string
  fecha_creacion: string
  fecha_modificacion: string
  fecha_eliminacion: string | null
  cliente: Cliente
  direccion: Direccion | null
  detallePedidos: DetallePedido[]
}
