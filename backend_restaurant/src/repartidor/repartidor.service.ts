import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repartidor } from './entities/repartidor.entity';
import { CreateRepartidorDto } from './dto/create-repartidor.dto';
import { UpdateRepartidorDto } from './dto/update-repartidor.dto';

@Injectable()
export class RepartidorService {
  constructor(
    @InjectRepository(Repartidor)
    private readonly repartidorRepository: Repository<Repartidor>,
  ) {}

  create(dto: CreateRepartidorDto): Promise<Repartidor> {
    const nuevo = this.repartidorRepository.create({
      ...dto,
      fechaEdad: new Date(dto.fechaEdad),
      fechaIngreso: new Date(dto.fechaIngreso),
      estado: true,
    });
    return this.repartidorRepository.save(nuevo);
  }

  findAll(): Promise<Repartidor[]> {
    return this.repartidorRepository.find({ where: { estado: true } });
  }

  async findOne(id: number): Promise<Repartidor> {
    const repartidor = await this.repartidorRepository.findOneBy({ id });
    if (!repartidor) throw new NotFoundException('Repartidor no encontrado');
    return repartidor;
  }

  async update(id: number, dto: UpdateRepartidorDto): Promise<Repartidor> {
    const cambios: any = { ...dto };

    if (dto.fechaEdad) {
      cambios.fechaEdad = new Date(dto.fechaEdad);
    }

    if (dto.fechaIngreso) {
      cambios.fechaIngreso = new Date(dto.fechaIngreso);
    }

    await this.repartidorRepository.update(id, cambios);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repartidorRepository.update(id, { estado: false });
  }
}
