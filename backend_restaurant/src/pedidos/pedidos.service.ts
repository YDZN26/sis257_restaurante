import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, DataSource } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { DetallePedido } from '../detalle_pedidos/entities/detalle.entity';
import { Platillo } from '../platillos/entities/platillo.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,

    @InjectRepository(DetallePedido)
    private readonly detalleRepo: Repository<DetallePedido>,

    @InjectRepository(Platillo)
    private readonly platilloRepo: Repository<Platillo>,

    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreatePedidoDto): Promise<Pedido> {
    return await this.dataSource.transaction(async (manager) => {
      // 1. Crear pedido base
      const pedido = manager.create(Pedido, {
        cliente: { id: dto.id_cliente },
        direccion: dto.id_direccion ? { id: dto.id_direccion } : undefined,
        fecha: dto.fecha ? new Date(dto.fecha) : undefined,
        total: dto.total,
        estado: dto.estado ?? 'pendiente',
      });
      await manager.save(pedido);

      // 2. Procesar cada platillo del detalle
      for (const item of dto.detalles) {
        const platillo = await manager.findOne(Platillo, {
          where: { id: item.platillo_id },
        });

        if (!platillo || platillo.stock < item.cantidad) {
          throw new Error(
            `Stock insuficiente para el platillo con ID ${item.platillo_id}`,
          );
        }

        // Descontar stock
        platillo.stock -= item.cantidad;
        await manager.save(platillo);

        // Crear detalle
        const detalle = manager.create(DetallePedido, {
          pedido,
          platillo,
          cantidad: item.cantidad,
          precio_unitario: platillo.precio,
          subtotal: platillo.precio * item.cantidad,
        });
        await manager.save(detalle);
      }

      return pedido;
    });
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepo.find({
      where: { fecha_eliminacion: IsNull() },
      relations: ['cliente', 'direccion'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: [
        'cliente',
        'direccion',
        'detallePedidos',
        'detallePedidos.platillo',
      ],
    });

    if (!pedido || pedido.fecha_eliminacion) {
      throw new NotFoundException('Pedido no encontrado');
    }

    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, {
      cliente: { id: dto.id_cliente },
      direccion: dto.id_direccion ? { id: dto.id_direccion } : undefined,
      fecha: dto.fecha ? new Date(dto.fecha) : pedido.fecha,
      total: dto.total ?? pedido.total,
      estado: dto.estado ?? pedido.estado,
      fecha_modificacion: new Date(),
    });
    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.fecha_eliminacion = new Date();
    return this.pedidoRepo.save(pedido);
  }

  async marcarEntregado(id: number): Promise<Pedido> {
    const pedido = await this.findOne(id);

    pedido.estado = 'entregado';
    pedido.fecha_modificacion = new Date();

    return this.pedidoRepo.save(pedido);
  }
}
