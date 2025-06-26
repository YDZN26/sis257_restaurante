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
import { DetallePedidosService } from './detalle_pedidos.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DetallePedido } from './entities/detalle.entity';

@ApiTags('detalle_pedidos')
@Controller('detalle_pedidos')
export class DetallePedidosController {
  constructor(private readonly service: DetallePedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo detalle de pedido' })
  create(@Body() dto: CreateDetalleDto): Promise<DetallePedido> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los detalles activos' })
  findAll(): Promise<DetallePedido[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar detalle de pedido' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetalleDto,
  ): Promise<DetallePedido> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente detalle de pedido' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido> {
    return this.service.remove(id);
  }
}
