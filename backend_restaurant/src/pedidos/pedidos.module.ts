import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { Platillo } from '../platillos/entities/platillo.entity';
import { DetallePedido } from '../detalle_pedidos/entities/detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Platillo, DetallePedido])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidoModule {}
