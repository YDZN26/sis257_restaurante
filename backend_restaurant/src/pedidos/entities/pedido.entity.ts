import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direcciones/entities/direcciones.entity';
import { Platillo } from 'src/platillos/entities/platillo.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  total: number;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaPedido: string;

  @ManyToOne(() => Repartidor, { eager: false })
  @JoinColumn({ name: 'idRepartidor' })
  repartidor: Repartidor;

  @ManyToOne(() => Cliente, { eager: false })
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @ManyToOne(() => Direccion, { eager: false })
  @JoinColumn({ name: 'idDireccion' })
  direccion: Direccion;

  @ManyToOne(() => Platillo, { eager: false })
  @JoinColumn({ name: 'idPlatillo' })
  platillo: Platillo;
}
