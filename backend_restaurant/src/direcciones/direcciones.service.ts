import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Direccion } from './entities/direccion.entity';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionesService {
  constructor(
    @InjectRepository(Direccion)
    private readonly direccionRepo: Repository<Direccion>,
  ) {}

  create(dto: CreateDireccionDto): Promise<Direccion> {
    const nueva = this.direccionRepo.create({
      ...dto,
      cliente: { id: dto.id_cliente },
    });
    return this.direccionRepo.save(nueva);
  }

  findAll(): Promise<Direccion[]> {
    return this.direccionRepo.find({
      where: { fecha_eliminacion: IsNull() },
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Direccion> {
    const direccion = await this.direccionRepo.findOne({
      where: { id },
      relations: ['cliente'],
    });
    if (!direccion || direccion.fecha_eliminacion) {
      throw new NotFoundException('Dirección no encontrada');
    }
    return direccion;
  }

  async update(id: number, dto: UpdateDireccionDto): Promise<Direccion> {
    const direccion = await this.findOne(id);
    Object.assign(direccion, dto, {
      cliente: { id: dto.id_cliente },
      fecha_modificacion: new Date(),
    });
    return this.direccionRepo.save(direccion);
  }

  async remove(id: number): Promise<Direccion> {
    const direccion = await this.findOne(id);
    direccion.fecha_eliminacion = new Date();
    return this.direccionRepo.save(direccion);
  }
}
