import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { Platillo } from './entities/platillo.entity';

@Injectable()
export class PlatillosService {
  constructor(
    @InjectRepository(Platillo)
    private readonly platilloRepository: Repository<Platillo>,
  ) {}

  create(createPlatilloDto: CreatePlatilloDto): Promise<Platillo> {
    const nuevo = this.platilloRepository.create(createPlatilloDto);
    return this.platilloRepository.save(nuevo);
  }

  findAll(): Promise<Platillo[]> {
    return this.platilloRepository.find();
  }

  async findOne(id: number): Promise<Platillo> {
    const platillo = await this.platilloRepository.findOne({ where: { id } });
    if (!platillo) throw new NotFoundException('Platillo no encontrado');
    return platillo;
  }

  async update(id: number, updatePlatilloDto: UpdatePlatilloDto): Promise<Platillo> {
    const platillo = await this.findOne(id);
    const actualizado = Object.assign(platillo, updatePlatilloDto);
    return this.platilloRepository.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const platillo = await this.findOne(id);
    await this.platilloRepository.remove(platillo);
  }
}
