import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 1. Define el tipo del payload
interface JwtPayload {
  username: string;
  sub: string;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  // 2. Usa el tipo JwtPayload correctamente
  validate(payload: JwtPayload) {
    const { username, sub, rol }: JwtPayload = payload;
    return {
      usuario: username,
      email: sub,
      rol: rol,
    };
  }
}
