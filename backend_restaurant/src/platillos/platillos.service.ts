import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Platillo } from './entities/platillo.entity';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';

@Injectable()
export class PlatillosService {
  constructor(
    @InjectRepository(Platillo)
    private readonly platilloRepo: Repository<Platillo>,
  ) {}

  create(dto: CreatePlatilloDto): Promise<Platillo> {
    const platillo = this.platilloRepo.create({
      ...dto,
      categoria: { id: dto.id_categoria },
    });
    return this.platilloRepo.save(platillo);
  }

  findAll(): Promise<Platillo[]> {
    return this.platilloRepo.find({
      where: { fecha_eliminacion: IsNull() },
      relations: ['categoria'],
    });
  }

  async findOne(id: number): Promise<Platillo> {
    const platillo = await this.platilloRepo.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!platillo || platillo.fecha_eliminacion) {
      throw new NotFoundException('Platillo no encontrado');
    }
    return platillo;
  }

  async update(id: number, dto: UpdatePlatilloDto): Promise<Platillo> {
    const platillo = await this.findOne(id);
    Object.assign(platillo, dto, {
      categoria: { id: dto.id_categoria },
      fecha_modificacion: new Date(),
    });
    return this.platilloRepo.save(platillo);
  }

  async remove(id: number): Promise<Platillo> {
    const platillo = await this.findOne(id);
    platillo.fecha_eliminacion = new Date();
    return this.platilloRepo.save(platillo);
  }
}
