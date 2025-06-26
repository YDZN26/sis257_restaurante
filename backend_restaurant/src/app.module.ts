import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatillosModule } from './platillos/platillos.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaPlatillosModule } from './categoria_platillos/categoria_platillos.module';
import { ClienteModule } from './clientes/clientes.module'; // ✅ correcto
import { DireccionesModule } from './direcciones/direcciones.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PedidoModule } from './pedidos/pedidos.module';
import { DetallePedidosModule } from './detalle_pedidos/detalle_pedidos.module';

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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PlatillosModule,
    AuthModule,
    CategoriaPlatillosModule,
    ClienteModule, // ✅ aquí se importa correctamente el módulo
    DireccionesModule,
    EmpleadosModule,
    UsuariosModule,
    PedidoModule,
    DetallePedidosModule,
  ],
})
export class AppModule {}
