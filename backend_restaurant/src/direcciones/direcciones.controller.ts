import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Direccion } from './entities/direccion.entity';

@ApiTags('direcciones')
@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly service: DireccionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva dirección' })
  create(@Body() dto: CreateDireccionDto): Promise<Direccion> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las direcciones activas' })
  findAll(): Promise<Direccion[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener dirección por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Direccion> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar dirección' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDireccionDto,
  ): Promise<Direccion> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente dirección' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Direccion> {
    return this.service.remove(id);
  }
}
