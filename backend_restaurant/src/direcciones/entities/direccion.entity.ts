import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @Column({ length: 200 })
  direccion: string;

  @Column({ length: 10, nullable: true })
  piso: string;

  @Column({ length: 250, nullable: true })
  indicaciones: string;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}
