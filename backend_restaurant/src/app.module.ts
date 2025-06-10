import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatillosModule } from './platillos/platillos.module';
import { Platillo } from './platillos/entities/platillo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'tu_usuario',
      password: 'tu_password',
      database: 'sis257_restaurante',
      entities: [Platillo], // asegúrate que esté acá también
      synchronize: true, // cuidado en producción
    }),
    PlatillosModule,
  ],
})
export class AppModule {}
