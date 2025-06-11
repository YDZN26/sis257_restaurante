import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('platillos')
export class Platillo {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @ApiProperty()
  nombre: string;

  @Column({ length: 50 })
  @ApiProperty()
  idPlatillo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  precio: number;

  @Column({ length: 50 })
  @ApiProperty()
  tiempoPreparacion: string;

  @Column('int', { default: 1 })
  @ApiProperty()
  disponibilidad: number;
}
