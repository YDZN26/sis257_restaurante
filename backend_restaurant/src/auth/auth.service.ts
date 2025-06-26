import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    dto: LoginDto,
  ): Promise<{ access_token: string; usuario: string }> {
    const user = await this.usuarioRepo.findOneBy({
      usuario_login: dto.usuario_login,
      clave: dto.clave,
    });

    if (!user || user.fecha_eliminacion) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, rol: user.rol };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      usuario: user.usuario_login,
    };
  }
}
