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
import { PlatillosService } from './platillos.service';
import { CreatePlatilloDto } from './dto/create-platillo.dto';
import { UpdatePlatilloDto } from './dto/update-platillo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('platillos')
@Controller('platillos')
export class PlatillosController {
  constructor(private readonly service: PlatillosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo platillo' })
  create(@Body() dto: CreatePlatilloDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los platillos activos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un platillo por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un platillo' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlatilloDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un platillo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
