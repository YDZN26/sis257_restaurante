import type { Repartidor } from './repartidor'
import type { Cliente } from './cliente'
import type { Direccion } from './direccion'
import type { Platillo } from './platillo'

export interface Pedido {
  id: number
  cantidad: number
  total: number
  fechaPedido: Date

  // relaciones que usa el frontend
  repartidor?: Repartidor
  cliente?: Cliente
  direccion?: Direccion
  platillo?: Platillo
}
