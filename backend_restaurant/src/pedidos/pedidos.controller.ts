import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Pedido } from './entities/pedido.entity';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly service: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo pedido' })
  create(@Body() dto: CreatePedidoDto): Promise<Pedido> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pedidos activos' })
  findAll(): Promise<Pedido[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener pedido por ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.service.findOne(id);
  }

  @Patch('entregar/:id')
  @ApiOperation({ summary: 'Marcar un pedido como entregado' })
  marcarEntregado(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.service.marcarEntregado(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar pedido' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePedidoDto,
  ): Promise<Pedido> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar lógicamente un pedido' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.service.remove(id);
  }
}
