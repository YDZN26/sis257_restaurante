export interface Pedido {
  id: number
  cantidad: number
  total: number
  fechaPedido: Date
  idRepartidor: number
  idCliente: number
  idPlatillo: number
  idDireccion: number
}
