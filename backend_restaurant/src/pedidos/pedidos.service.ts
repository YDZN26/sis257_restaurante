import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const nuevo = this.pedidoRepository.create({
      cantidad: createPedidoDto.cantidad,
      total: createPedidoDto.total,
      fechaPedido: createPedidoDto.fechaPedido,
      repartidor: { id: createPedidoDto.idRepartidor },
      cliente: { id: createPedidoDto.idCliente },
      direccion: { id: createPedidoDto.idDireccion },
      platillo: { id: createPedidoDto.idPlatillo },
    });

    return this.pedidoRepository.save(nuevo);
  }

  findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: ['repartidor', 'cliente', 'direccion', 'platillo'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['repartidor', 'cliente', 'direccion', 'platillo'],
    });

    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedidoExistente = await this.findOne(id);

    const actualizado = this.pedidoRepository.create({
      ...pedidoExistente,
      cantidad: updatePedidoDto.cantidad,
      total: updatePedidoDto.total,
      fechaPedido: updatePedidoDto.fechaPedido,
      repartidor: { id: updatePedidoDto.idRepartidor },
      cliente: { id: updatePedidoDto.idCliente },
      direccion: { id: updatePedidoDto.idDireccion },
      platillo: { id: updatePedidoDto.idPlatillo },
    });

    return this.pedidoRepository.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}
