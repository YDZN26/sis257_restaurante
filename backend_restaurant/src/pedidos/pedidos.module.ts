import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from './pedidos.service';
import { PedidoController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';

import { Repartidor } from 'src/repartidor/entities/repartidor.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Direccione } from 'src/direcciones/entities/direccione.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Repartidor, Cliente, Direccione]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
