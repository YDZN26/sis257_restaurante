import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('repartidores') // o el nombre real de tu tabla
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
  fechaNacimiento: Date;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaIngreso: Date;
}
