import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Validación de usuario "manual" (usuario codificado)
  validateUser(usuario: string, clave: string): JwtUser | null {
    if (usuario === 'qrico123' && clave === 'hola123') {
      return {
        username: 'qrico123',
        email: 'qrico@gmail.com',
        rol: 'administrador',
      };
    }
    return null;
  }

  login(user: JwtUser) {
    const payload = {
      username: user.username,
      sub: user.email,
      rol: user.rol,
    };
    return {
      access_token: this.jwtService.sign(payload),
      usuario: user.username,
    };
  }
}

// Interfaz local para tipado del usuario
interface JwtUser {
  username: string;
  email: string;
  rol: string;
}
