import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const user = this.authService.validateUser(
      loginDto.usuario,
      loginDto.clave,
    );
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    return this.authService.login(user);
  }
}
