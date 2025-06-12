import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // <- esto protege todas las rutas
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  // puedes proteger también métodos individualmente si prefieres:
  // @UseGuards(JwtAuthGuard)
  // @Get('privado')
  // findPrivado() { ... }
}
