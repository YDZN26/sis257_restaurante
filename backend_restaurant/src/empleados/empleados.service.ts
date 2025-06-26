import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) {}

  create(dto: CreateEmpleadoDto): Promise<Empleado> {
    const nuevo = this.empleadoRepo.create(dto);
    return this.empleadoRepo.save(nuevo);
  }

  findAll(): Promise<Empleado[]> {
    return this.empleadoRepo.find({
      where: { fecha_eliminacion: IsNull() },
    });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepo.findOneBy({ id });
    if (!empleado || empleado.fecha_eliminacion) {
      throw new NotFoundException('Empleado no encontrado');
    }
    return empleado;
  }

  async update(id: number, dto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    Object.assign(empleado, dto, {
      fecha_modificacion: new Date(),
    });
    return this.empleadoRepo.save(empleado);
  }

  async remove(id: number): Promise<Empleado> {
    const empleado = await this.findOne(id);
    empleado.fecha_eliminacion = new Date();
    return this.empleadoRepo.save(empleado);
  }
}
