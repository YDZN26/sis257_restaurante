import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedidos.service';
import { PedidoController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';

import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccion } from 'src/direcciones/entities/direcciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Repartidor, Cliente, Direccion])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
