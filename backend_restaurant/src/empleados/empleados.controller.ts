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
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Empleado } from './entities/empleado.entity';

@ApiTags('empleados')
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly service: EmpleadosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo empleado' })
  create(@Body() dto: CreateEmpleadoDto): Promise<Empleado> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los empleados activos' })
  findAll(): Promise<Empleado[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener empleado por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Empleado> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar empleado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente empleado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Empleado> {
    return this.service.remove(id);
  }
}
