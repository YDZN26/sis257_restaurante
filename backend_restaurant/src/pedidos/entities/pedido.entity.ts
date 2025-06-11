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
import { Direccione } from 'src/direcciones/entities/direccione.entity';

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

  @ManyToOne(() => Repartidor)
  @JoinColumn({ name: 'id_repartidor' })
  @ApiProperty({ type: () => Repartidor })
  repartidor: Repartidor;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  @ApiProperty({ type: () => Cliente })
  cliente: Cliente;

  @ManyToOne(() => Direccione)
  @JoinColumn({ name: 'id_direccion' })
  @ApiProperty({ type: () => Direccione })
  direccion: Direccione;
}
