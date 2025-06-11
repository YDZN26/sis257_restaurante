import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatillosModule } from './platillos/platillos.module';
import { ClientesModule } from './cliente/clientes.module';
import { PedidoModule } from './pedidos/pedidos.module';

console.log('DB_HOST:', process.env.DB_HOST);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlatillosModule,
    ClientesModule,
    PedidoModule,
  ],
})
export class AppModule {}
