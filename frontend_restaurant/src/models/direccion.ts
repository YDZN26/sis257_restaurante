export interface Direccion {
  id: number
  direccion: string
  piso: string
  indicaciones: string
  estado: string
  fecha_registro: string
  cliente: {
    nombreCliente: string
  } | null;
}
