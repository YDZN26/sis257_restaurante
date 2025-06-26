import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CategoriaPlatillo } from './entities/categoria_platillo.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaPlatillosService {
  constructor(
    @InjectRepository(CategoriaPlatillo)
    private readonly categoriaRepo: Repository<CategoriaPlatillo>,
  ) {}

  create(dto: CreateCategoriaDto) {
    const nuevaCategoria = this.categoriaRepo.create(dto);
    return this.categoriaRepo.save(nuevaCategoria);
  }

  findAll() {
    return this.categoriaRepo.find({
      where: { fecha_eliminacion: IsNull() },
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOneBy({ id });
    if (!categoria || categoria.fecha_eliminacion) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, dto, {
      fecha_modificacion: new Date(),
    });
    return this.categoriaRepo.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    categoria.fecha_eliminacion = new Date();
    return this.categoriaRepo.save(categoria);
  }
}
