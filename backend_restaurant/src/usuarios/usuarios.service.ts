import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  create(dto: CreateUsuarioDto): Promise<Usuario> {
    const nuevo = this.usuarioRepo.create({
      ...dto,
      empleado: { id: dto.id_empleado },
    });
    return this.usuarioRepo.save(nuevo);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepo.find({
      where: { fecha_eliminacion: IsNull() },
      relations: ['empleado'],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['empleado'],
    });
    if (!usuario || usuario.fecha_eliminacion) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    Object.assign(usuario, dto, {
      empleado: { id: dto.id_empleado },
      fecha_modificacion: new Date(),
    });
    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.fecha_eliminacion = new Date();
    return this.usuarioRepo.save(usuario);
  }
}
