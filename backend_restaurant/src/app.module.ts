import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PlatillosModule } from './platillos/platillos.module';
import { RepartidorModule } from './repartidor/repartidor.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagoModule } from './pago/pago.module';
import { DetallesModule } from './detalles/detalles.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [UsuarioModule, PlatillosModule, RepartidorModule, PedidosModule, PagoModule, DetallesModule, DireccionesModule, ClienteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
