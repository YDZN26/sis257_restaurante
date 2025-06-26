export interface Platillo {
  id: number
  nombre: string
  precio: number
  tiempo_preparacion: string
  stock: number
  categoria?: { id: number, nombre?: string }
}
