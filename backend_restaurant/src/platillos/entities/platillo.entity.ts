import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaPlatillo } from '../../categoria_platillos/entities/categoria_platillo.entity';

@Entity('platillos')
export class Platillo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @Column({ type: 'varchar', length: 100 })
  tiempo_preparacion: string;

  @ManyToOne(() => CategoriaPlatillo)
  categoria: CategoriaPlatillo;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion: Date;
}
