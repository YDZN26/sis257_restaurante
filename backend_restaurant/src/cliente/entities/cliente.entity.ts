import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column('varchar', { length: 50 })
  @ApiProperty()
  nombreCliente: string;

  @Column('varchar', { length: 10 })
  @ApiProperty()
  carnetIdentidad: string;

  @Column('int')
  @ApiProperty()
  celular: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  @ApiProperty()
  fechaCreacion: Date;
}
