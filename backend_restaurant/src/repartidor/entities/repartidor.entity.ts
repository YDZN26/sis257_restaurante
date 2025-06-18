import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('repartidor')
export class Repartidor {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @ApiProperty()
  nombreRepartidor: string;

  @Column({ length: 20 })
  @ApiProperty()
  carnetIdentidad: string;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaEdad: Date;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaIngreso: Date;

  @Column({ default: true })
  @ApiProperty()
  estado: boolean;
}
