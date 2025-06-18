import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatillosModule } from './platillos/platillos.module';
import { ClientesModule } from './cliente/clientes.module';
import { PedidoModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { RepartidorModule } from './repartidor/repartidor.module';

console.log('DB_HOST:', process.env.DB_HOST);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '*/**/entities/*.{ts|js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlatillosModule,
    ClientesModule,
    PedidoModule,
    AuthModule,
    DireccionesModule,
    RepartidorModule,
  ],
})
export class AppModule {}
