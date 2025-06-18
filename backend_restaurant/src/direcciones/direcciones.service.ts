import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Direccion } from './entities/direcciones.entity';
import { CreateDireccioneDto } from './dto/create-direccione.dto';
import { UpdateDireccioneDto } from './dto/update-direccione.dto';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepository: Repository<Direccion>,
  ) {}

  async create(createDireccioneDto: CreateDireccioneDto): Promise<Direccion> {
    const nueva = this.direccionRepository.create({
      ...createDireccioneDto,
      cliente: { id: createDireccioneDto.idCliente },
      fecha_registro: new Date(),
    });
    return this.direccionRepository.save(nueva);
  }

  async findAll(): Promise<Direccion[]> {
    return this.direccionRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepository.findOne({
      where: { id },
      relations: ['cliente'], // ← importante para incluir el cliente
    });

    if (!direccion) {
      throw new NotFoundException('Dirección no encontrada');
    }

    return direccion;
  }

  async update(
    id: number,
    updateDireccioneDto: UpdateDireccioneDto,
  ): Promise<Direccion> {
    const direccion = await this.findOne(id);

    const actualizada = this.direccionRepository.create({
      ...direccion,
      direccion: updateDireccioneDto.direccion,
      piso: updateDireccioneDto.piso,
      indicaciones: updateDireccioneDto.indicaciones,
      estado: updateDireccioneDto.estado,
      cliente: { id: updateDireccioneDto.idCliente },
    });

    return this.direccionRepository.save(actualizada);
  }

  async remove(id: number): Promise<void> {
    await this.direccionRepository.delete(id);
  }
}
