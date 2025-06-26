import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { DetallePedido } from './entities/detalle.entity';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';

@Injectable()
export class DetallePedidosService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly detalleRepo: Repository<DetallePedido>,
  ) {}

  create(dto: CreateDetalleDto): Promise<DetallePedido> {
    const nuevo: DetallePedido = this.detalleRepo.create({
      cantidad: dto.cantidad,
      precio_unitario: dto.precio_unitario,
      subtotal: dto.subtotal,
      pedido: { id: dto.id_pedido },
      platillo: { id: dto.id_platillo },
    });
    return this.detalleRepo.save(nuevo);
  }

  findAll(): Promise<DetallePedido[]> {
    return this.detalleRepo.find({
      where: { fecha_eliminacion: IsNull() },
      relations: ['pedido', 'platillo'],
    });
  }

  async findOne(id: number): Promise<DetallePedido> {
    const detalle = await this.detalleRepo.findOne({
      where: { id },
      relations: ['pedido', 'platillo'],
    });
    if (!detalle || detalle.fecha_eliminacion) {
      throw new NotFoundException('Detalle no encontrado');
    }
    return detalle;
  }

  async update(id: number, dto: UpdateDetalleDto): Promise<DetallePedido> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, {
      cantidad: dto.cantidad ?? detalle.cantidad,
      precio_unitario: dto.precio_unitario ?? detalle.precio_unitario,
      subtotal: dto.subtotal ?? detalle.subtotal,
      pedido: { id: dto.id_pedido },
      platillo: { id: dto.id_platillo },
      fecha_modificacion: new Date(),
    });
    return this.detalleRepo.save(detalle);
  }

  async remove(id: number): Promise<DetallePedido> {
    const detalle = await this.findOne(id);
    detalle.fecha_eliminacion = new Date();
    return this.detalleRepo.save(detalle);
  }
}
