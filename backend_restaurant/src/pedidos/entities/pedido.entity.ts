import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column()
  @ApiProperty()
  id_repartidor: number;

  @Column()
  @ApiProperty()
  id_cliente: number;

  @Column()
  @ApiProperty()
  id_direccion: number;
}
