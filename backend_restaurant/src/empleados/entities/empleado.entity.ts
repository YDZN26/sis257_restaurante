import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  primer_apellido: string;

  @Column({ length: 100 })
  segundo_apellido: string;

  @Column({ length: 20, unique: true })
  cedula_identidad: string;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 20 })
  celular: string;

  @Column({ length: 50 })
  cargo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}
