import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedidosService } from './detalle_pedidos.service';
import { DetallePedidosController } from './detalle_pedidos.controller';
import { DetallePedido } from './entities/detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  controllers: [DetallePedidosController],
  providers: [DetallePedidosService],
})
export class DetallePedidosModule {}
