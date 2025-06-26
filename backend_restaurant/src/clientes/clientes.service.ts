import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto): Promise<Cliente> {
    const nuevo: Cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(nuevo);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find({
      where: { fecha_eliminacion: IsNull() },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente: Cliente | null = await this.clienteRepo.findOneBy({ id });
    if (!cliente || cliente.fecha_eliminacion) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente: Cliente = await this.findOne(id);
    Object.assign(cliente, dto, {
      fecha_modificacion: new Date(),
    });
    return this.clienteRepo.save(cliente);
  }

  async remove(id: number): Promise<Cliente> {
    const cliente: Cliente = await this.findOne(id);
    cliente.fecha_eliminacion = new Date();
    return this.clienteRepo.save(cliente);
  }
}
