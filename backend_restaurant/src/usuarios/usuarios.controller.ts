import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'; // ← añade ApiBearerAuth
import { Usuario } from './entities/usuario.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('usuarios')
@ApiBearerAuth() // ← ESTA LÍNEA ES CLAVE
@UseGuards(AuthGuard('jwt'))
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo usuario' })
  create(@Body() dto: CreateUsuarioDto): Promise<Usuario> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios activos' })
  findAll(): Promise<Usuario[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente usuario' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.service.remove(id);
  }
}
