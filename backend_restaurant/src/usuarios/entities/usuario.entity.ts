import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empleado)
  @JoinColumn({ name: 'id_empleado' }) // 👈 esta línea es clave
  empleado: Empleado;

  @Column({ length: 50, unique: true })
  usuario_login: string;

  @Column({ length: 100 })
  clave: string;

  @Column({ length: 50 })
  rol: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}
