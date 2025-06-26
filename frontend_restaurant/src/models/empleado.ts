export interface Empleado {
  id: number // 👈 asegúrate que NO sea `number | undefined`
  cedula_identidad: string
  celular: string
  nombres: string
  primer_apellido: string
  segundo_apellido: string
  direccion: string
  cargo: string
}
