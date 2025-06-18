import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from '../../cliente/entities/cliente.entity'; // ajusta el path si es diferente

@Entity('direcciones')
export class Direccion {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 150 })
  @ApiProperty()
  direccion: string;

  @Column({ length: 20 })
  @ApiProperty()
  piso: string;

  @Column({ length: 100 })
  @ApiProperty()
  indicaciones: string;

  @Column()
  @ApiProperty()
  estado: boolean;

  @Column({ type: 'date' })
  @ApiProperty()
  fecha_registro: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.direcciones, { eager: false })
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;
}
